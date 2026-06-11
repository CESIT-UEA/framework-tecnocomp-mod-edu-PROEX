import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { filter, Observable } from 'rxjs';
import { ServiceAppService } from './service-app.service';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ChatPersonalizadoService {

  private urlApi =  environment.baseUrl
  private sessionId!: string;
  private moduloAtual!: string;
  private idModulo! :number;
  private ltik!: any;

  constructor(private http: HttpClient, private apiService: ServiceAppService) {
    this.inicializarSessaoPorModulo()
  }


  enviarMensagemParaChat(mensagem: string): Observable<any>{
    if (!this.sessionId) {
      throw new Error('Sessão do chat ainda não inicializada');
    }

     const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.ltik,
      });

    return this.http.post<any>(`${this.urlApi}/enviar-mensagem-agente`, { 
      mensagem, 
      nomeModulo: this.moduloAtual,
      sessionId: this.sessionId,
      idModulo: this.idModulo
    }, { headers });
  }



   private inicializarSessaoPorModulo(): void {
    this.apiService.dadosCompletos$
      .pipe(
        filter(d => !!d?.modulo?.nome_modulo)
      )
      .subscribe(dados => {
        const modulo = dados.modulo.nome_modulo;
        this.idModulo = dados.modulo.id
        this.ltik = dados.user.ltik

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
