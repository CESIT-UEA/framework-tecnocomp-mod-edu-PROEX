import { Component } from '@angular/core';

@Component({
  selector: 'app-apresentacao-modulo',
  templateUrl: './apresentacao-modulo.component.html',
  styleUrls: ['./apresentacao-modulo.component.css']
})
export class ApresentacaoModuloComponent {

}

(() => {
  const openBtn = document.querySelector<HTMLButtonElement>('.img-menu');
  const panel = document.querySelector<HTMLElement>('.menu-panel');
  const backdrop = document.querySelector<HTMLElement>('.menu-backdrop');
  const closeBtn = document.querySelector<HTMLButtonElement>('.menu-close');

  function openMenu(): void {
    if (!panel || !backdrop) return;
    panel.setAttribute('aria-hidden', 'false');
    panel.classList.add('open');
    backdrop.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu(): void {
    if (!panel || !backdrop) return;
    panel.setAttribute('aria-hidden', 'true');
    panel.classList.remove('open');
    backdrop.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  openBtn?.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);
  backdrop?.addEventListener('click', closeMenu);
  window.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape') closeMenu();
  });

  const STORAGE_KEY = 'topicosConcluidos';
  const TOTAL_TOPICOS = 4;
  const TOPICOS: string[] = ['1', '2', '3', '4'];

  function getTopicosConcluidos(): string[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    try {
      return stored ? (JSON.parse(stored) as string[]) : [];
    } catch {
      // se o JSON estiver corrompido, reinicia
      localStorage.removeItem(STORAGE_KEY);
      return [];
    }
  }

  function saveTopicosConcluidos(topicos: string[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(topicos));
  }

  function atualizarProgresso(): void {
    const topicosConcluidos = getTopicosConcluidos();
    const totalConcluidos = topicosConcluidos.length;
    const porcentagem = Math.round((totalConcluidos / TOTAL_TOPICOS) * 100);

    const progressoBarra = document.getElementById('progressoBarra') as HTMLElement | null;
    const progressoTexto = document.getElementById('progressoTexto') as HTMLElement | null;
    const topicosConcluidosTexto = document.getElementById('topicosConcluidosTexto') as HTMLElement | null;
    const progressBar = document.querySelector<HTMLElement>('.menu-progress-bar');

    if (progressoBarra) {
      progressoBarra.style.width = `${porcentagem}%`;
    }
    if (progressoTexto) {
      progressoTexto.textContent = `${porcentagem}%`;
    }
    if (topicosConcluidosTexto) {
      topicosConcluidosTexto.textContent = `${totalConcluidos} / ${TOTAL_TOPICOS} Tópicos Concluídos`;
    }
    if (progressBar) {
      // aria-valuenow deve ser string
      progressBar.setAttribute('aria-valuenow', String(porcentagem));
    }
  }

  function marcarTopico(topicoId: string): void {
    const topicosConcluidos = getTopicosConcluidos();
    if (!topicosConcluidos.includes(topicoId)) {
      topicosConcluidos.push(topicoId);
      saveTopicosConcluidos(topicosConcluidos);
      atualizarProgresso();
    }
  }

  function restaurarEstado(): void {
    const topicosConcluidos = getTopicosConcluidos();
    const menuItems = document.querySelectorAll<HTMLElement>('.menu-item');

    menuItems.forEach(item => {
      const topicoId = item.getAttribute('data-topico');
      if (topicoId && topicosConcluidos.includes(topicoId)) {
        item.classList.add('completed');
      }
    });

    atualizarProgresso();
  }

  function inicializarTopicos(): void {
    const menuItems = document.querySelectorAll<HTMLElement>('.menu-item');

    menuItems.forEach(item => {
      item.addEventListener('click', function () {
        const topicoId = this.getAttribute('data-topico');
        if (!topicoId) return;

        const topicosConcluidos = getTopicosConcluidos();

        if (!topicosConcluidos.includes(topicoId)) {
          this.classList.add('completed');
          marcarTopico(topicoId);
        }
      });
    });

    restaurarEstado();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarTopicos);
  } else {
    inicializarTopicos();
  }
})();

