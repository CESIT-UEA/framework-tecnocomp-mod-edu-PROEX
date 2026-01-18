import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, Observable } from 'rxjs';
import { ServiceAppService } from './service-app.service';

@Injectable({
  providedIn: 'root'
})
export class ChatPersonalizadoService {


  private chatUrl =  "https://tecnocomp.uea.edu.br:5678/webhook/chat-personalizado";
  private sessionId!: string;
  private moduloAtual!: string;

  constructor(private http: HttpClient, private apiService: ServiceAppService) {
    this.inicializarSessaoPorModulo()
  }


  enviarMensagemParaChat(mensagem: string): Observable<any>{
    if (!this.sessionId) {
      throw new Error('Sessão do chat ainda não inicializada');
    }

    return this.http.post<any>(this.chatUrl, { 
      mensagem, 
      sessionId: this.sessionId,
      modulo: this.moduloAtual
    });
  }



   private inicializarSessaoPorModulo(): void {
    this.apiService.dadosCompletos$
      .pipe(
        filter(d => !!d?.modulo?.nome_modulo)
      )
      .subscribe(dados => {
        const modulo = dados.modulo.nome_modulo;

        if (this.moduloAtual === modulo) return;

        this.moduloAtual = modulo;
        this.sessionId = this.getOrCreateSessionIdPorModulo(modulo);
      });
  }

  private getOrCreateSessionIdPorModulo(modulo: string): string {
    const moduloKey = this.normalizarModulo(modulo);
    const storageKey = `chat_session_${moduloKey}`;

    let sessionId = localStorage.getItem(storageKey);

    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem(storageKey, sessionId);
    }

    return sessionId;
  }

  private normalizarModulo(modulo: string): string {
    return modulo
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '_');
  } 
}
