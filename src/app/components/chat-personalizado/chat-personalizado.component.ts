import { Component, ElementRef, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ChatPersonalizadoService } from 'src/app/chat-personalizado.service';


@Component({
  selector: 'app-chat-personalizado',
  templateUrl: './chat-personalizado.component.html',
  styleUrls: ['./chat-personalizado.component.css']
})
export class ChatPersonalizadoComponent {
    aberto = false;

    alternarChat() {
    this.aberto = !this.aberto;

    const chatContainer = document.getElementById("chat-container");

    if (!chatContainer) return;


    // Resetar o tamanho ao padrão
    chatContainer.style.width = "33%";
    chatContainer.style.height = "80%";
  }


    @ViewChild('chatContainer') chatContainer!: ElementRef<HTMLElement>;

    private startX = 0;
    private startWidth = 0;

    private readonly larguraMinima = 0;
    private readonly larguraMaxima = 1350;

    constructor(private chatService: ChatPersonalizadoService) {}


    input = new FormControl('');

    /**
     * Inicia o redimensionamento
     */
    IniciarRedimensionar(event: PointerEvent) {
      event.preventDefault();

      this.startX = event.clientX;
      this.startWidth = this.chatContainer.nativeElement.offsetWidth;
      

      document.addEventListener('pointermove', this.onPointerMove);
      document.addEventListener('pointerup', this.PararRedimensionar);
    }

    /**
     * Redimensiona enquanto arrasta
     */
    private onPointerMove = (e: PointerEvent) => {
      const dx = e.clientX - this.startX;
      const newWidth = this.startWidth - dx;

      this.chatContainer.nativeElement.style.width =
        this.clamp(newWidth) + 'px';
    };

    /**
     * Finaliza o redimensionamento
     */
    PararRedimensionar = () => {
      document.removeEventListener('pointermove', this.onPointerMove);
      document.removeEventListener('pointerup', this.PararRedimensionar);
    };

    /**
     * Limita a largura
     */
    private clamp(value: number) {
      return Math.max(
        this.larguraMinima,
        Math.min(this.larguraMaxima, value)
      );
    }

    ngOnDestroy() {
      this.PararRedimensionar();
    }


    mensagens: { texto: string; tipo: 'user' | 'assistente' }[] = [];

    @ViewChild('chatMessages') chatMessages!: ElementRef<HTMLDivElement>;
    carregando: boolean | undefined;

    scrollToBottom() {
      const el = this.chatMessages.nativeElement;

      el.scrollTo({
        top: el.scrollHeight,
        behavior: 'smooth'
      });
    }

    enviarMensagem() {
      const texto = this.input.value?.trim();
      if (!texto) return;

      this.mensagens.push({ texto, tipo: 'user' });
      this.input.setValue('');

      this.carregando = true;

      setTimeout(() => this.scrollToBottom());

      this.chatService.enviarMensagemParaChat(texto).subscribe({
        next: (response) => {
          this.carregando = false
          this.mensagens.push({
            texto: response.dados.output,
            tipo: 'assistente'
          });

          setTimeout(() => this.scrollToBottom());
        },
        error: (error) => {
          this.carregando = false
          this.mensagens.push({
            texto: 'Desculpe, tivemos uma falha na comunicação!',
            tipo: 'assistente'
          })
        }
      });
    }

}
