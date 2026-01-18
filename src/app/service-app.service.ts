import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Bloqueio } from './bloqueioInterface';
import { Topico } from './components/forum/topico.interface';
import { TopicoF } from './components/forum/topico-forum/topico-forum.interface';
import { environment } from 'src/environments/environment.development';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ModuloService } from './personalizavel/modulo.service';

/**
 * Service a qual guarda as operações essenciais, como o envio de notas, as informações do usuario, etc
 */
@Injectable({
  providedIn: 'root',
})
export class ServiceAppService {
  player: any; // Armazena o player do YouTube
  controlAtividade: number = 1;
  private dadosCompletosSource = new BehaviorSubject<any>(null);
  dadosCompletos$ = this.dadosCompletosSource.asObservable();
  /**
   * url da API
   */
  public apiUrl = environment.baseUrl;
  public currentVideoIndex: number = 0;
  // Implementar o Controle com apenas um service
  private storageKey = 'dados_completos_do_modulo';
  public dados_completos: any = [];

  perfilUser = false;

  abreMenuUser() {
    this.perfilUser = true;
    console.log('Abrindo menu');
  }

  fechaMenuUser() {
    this.perfilUser = false;
    console.log('Fechou menu User');
  }

  /**
   * @method
   * Constructor do ServiceAppService
   */
  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    public moduloService: ModuloService
  ) {}

  /**
   * Variavel que guarda a nota total do usuario no modulo
   */
  notaTotal: number = 0;

  /**
   * Variavel que guarda o token do usuario
   */
  tokenStorage = localStorage.getItem('token');
  url_return = localStorage.getItem('url_retono');

  /**
   * Variavel que guarda a quantidade de topicos
   */
  quantidadeTopicos = 0;

  topicos: Topico[] = [];

  /**
   * Variavel que guarda um vetor contendo a relação dos alunos com os topicos, auxiliando no bloqueio para ultrapassar rapidamente os tópicos do modulo
   */
  bloqueio: any[] = [];

  /**
   * Variavel que guarda as informações do usuario vindas do moodle
   */
  informacoes = [];

  /**
   * Variavel que inicializa para posteriormente salvar a url inicial
   */
  urlInicio: string = '';

  /**
   * @method
   * Metódo que ?????? Verificar se este metodo esta sendo utilizado
   */
  liberar(idTopico: number): Observable<any> {
    this.tokenStorage = localStorage.getItem('token');
    const grade = { token: this.tokenStorage, idTopico: idTopico };
    console.log(grade);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.tokenStorage,
    });

    return this.http.post(`${this.apiUrl}/api/liberar`, grade, {
      headers: headers,
    });
  }

  getDadosCompletos(): void {
    this.dados_completos = localStorage.getItem(this.storageKey);
    if (this.dados_completos) {
      this.dados_completos = JSON.parse(this.dados_completos);
      this.notaTotal = this.dados_completos?.userModulo?.nota;

      console.log('Service data 3: ', this.dados_completos);
    }
  }

  setDadosCompletos(dados: any) {
    localStorage.setItem(this.storageKey, JSON.stringify(dados));

    this.getDadosCompletos();
  }

  removeDadosCompletos(): void {
    localStorage.removeItem(this.storageKey);
  }

  /**
   * @method
   * metódo responsavel pelo envio das notas para o moodle, um dos metódos essenciais, envia de forma com que a atividade seja concluida
   */
  sendGrade(nota: number): Observable<any> {
    this.tokenStorage = localStorage.getItem('token');
    const grade = { grade: nota };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.tokenStorage,
    });

    return this.http.post(this.apiUrl + '/grade', grade, {
      headers: headers,
    });
  }

  /**
   * @method
   * metódo responsavel pelo envio das notas para o moodle, um dos metódos essenciais, envia de forma com que a atividade ainda esteja em progresso
   */
  sendGradeIn(nota: number): Observable<any> {
    this.tokenStorage = localStorage.getItem('token');
    const grade = { grade: nota };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.tokenStorage,
    });

    return this.http.post(this.apiUrl + '/gradein', grade, {
      headers: headers,
    });
  }

  getTopicoForum(id: number): Observable<any> {
    const url = `${this.apiUrl}/api/forum_topicos/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.tokenStorage,
    });

    return this.http.get(url, {
      headers,
    });
  }

  getTopicoForumOne(id: number): Observable<any> {
    const url = `${this.apiUrl}/api/forum_topicos_one/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.tokenStorage,
    });

    return this.http.get(url, {
      headers,
    });
  }

  /**
   * Variável que controla as rotas na página HOME
   */
  controllerSwitchHome: number = 0;

  criarPostagemTopico(postagem: any) /* : Observable<any> */ {
    console.log(postagem);
    this.tokenStorage = localStorage.getItem('token');
    const grade = { postagem };
    console.log(grade);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.tokenStorage,
    });

    return this.http.post(`${this.apiUrl}/api/criar/forum`, grade, {
      headers: headers,
    });
  }

  criarComentario(comentario: any) /* : Observable<any> */ {
    console.log(comentario);
    this.tokenStorage = localStorage.getItem('token');
    const grade = { comentario };
    console.log(grade);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.tokenStorage,
    });

    return this.http.post(`${this.apiUrl}/api/criar/comentario`, grade, {
      headers: headers,
    });
  }

  finalizarVideo(
    ltiUserId: string,
    videoId: number,
    ltik: string
  ): Observable<any> {
    const body = { ltiUserId, videoId, ltik };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.dados_completos.user.ltik,
    });

    return this.http.post(`${this.apiUrl}/finalizar-video`, body, { headers });
  }
  salvarProgressoVideos(): Observable<any> {
    const body = {
      id_video: this.currentVideoIndex,
      id_topico:
        this.dados_completos.topicos?.[this.moduloService.controll_topico].id,
      ltik: this.dados_completos.user.ltik,
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.dados_completos.user.ltik,
    });

    return this.http.post(`${this.apiUrl}/salvar-progresso-video`, body, {
      headers,
    });
  }

  public verificarTodosVideosCompletos(videos: any[]): boolean {
    // Itera sobre todos os vídeos
    for (const video of videos) {
      // Para cada vídeo, verifica os dados de UsuarioVideos
      for (const usuarioVideo of video.UsuarioVideos) {
        // Se encontrar algum vídeo não completo, retorna false
        if (!usuarioVideo.completo) {
          return false;
        }
      }
    }
    // Se nenhum vídeo estiver incompleto, retorna true
    return true;
  }

  public mensagem(
    texto: string,
    classePersonalizada: string = '',
    tempo: number = 2000
  ) {
    let config = new MatSnackBarConfig();
    config.panelClass = 'testando';
    if (classePersonalizada != '') {
      config.panelClass = classePersonalizada;
    }
    config.duration = tempo;
    this._snackBar.open(texto, 'ok', config);
  }

  enviarRespostaIncorreta(
    idTopico: number,
    ltik: string,
    respostaErrada: string
  ): Observable<any> {
    const body = { idTopico, ltik, respostaErrada };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.dados_completos.user.ltik,
    });

    return this.http.post(`${this.apiUrl}/resposta-errada`, body, { headers });
  }

  enviarResetarRespostaIncorreta(
    idTopico: number,
    ltik: string
  ): Observable<any> {
    const body = { idTopico, ltik };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.dados_completos.user.ltik,
    });

    return this.http.post(`${this.apiUrl}/resposta-errada-refazer`, body, {
      headers,
    });
  }

  enviarVistoSaibaMais(): Observable<any> {
    const body = {
      idTopico:
        this.dados_completos.topicos?.[this.moduloService.controll_topico].id,
      ltik: this.dados_completos.user.ltik,
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.dados_completos.user.ltik,
    });

    return this.http.post(`${this.apiUrl}/finalizaSaibaMais`, body, {
      headers,
    });
  }

  enviarVistoTextoApoio(): Observable<any> {
    const body = {
      idTopico:
        this.dados_completos.topicos?.[this.moduloService.controll_topico].id,
      ltik: this.dados_completos.user.ltik,
    };
    console.log(
      this.dados_completos.topicos?.[this.moduloService.controll_topico].id
    );
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.dados_completos.user.ltik,
    });

    return this.http.post(`${this.apiUrl}/finalizaTextoApoio`, body, {
      headers,
    });
  }

  enviarVistoReferencias(): Observable<any> {
    const body = {
      idTopico:
        this.dados_completos.topicos?.[this.moduloService.controll_topico].id,
      ltik: this.dados_completos.user.ltik,
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.dados_completos.user.ltik,
    });

    return this.http.post(`${this.apiUrl}/finalizaReferencias`, body, {
      headers,
    });
  }

  retornarLms() {
    console.log(this.dados_completos.userModulo.url_retorno);
    window.location.href = this.dados_completos.userModulo.url_retorno;
  }

  recreatePlayer(): void {
    if (this.player) {
      console.log('Caiu aqui');
      this.player.destroy(); // Destroi o player existente
    }

    const videoId = this.extractVideoId(
      this.dados_completos.topicos?.[this.moduloService.controll_topico]
        ?.VideoUrls[this.currentVideoIndex].url
    );

    this.player = new (window as any).YT.Player('player', {
      height: '100%',
      width: '100%',
      videoId: videoId,
      playerVars: {
        rel: 0,
        enablejsapi: 1,
      },
      events: {
        onReady: this.onPlayerReady.bind(this),
        onStateChange: this.onPlayerStateChange.bind(this),
      },
    });
    console.log(this.player);
  }

  loadYouTubeAPI(): void {
    if (!(window as any).YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);

      (window as any).onYouTubeIframeAPIReady = () => {
        this.recreatePlayer();
      };
    }
  }

  extractVideoId(url: string): string {
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:watch\?v=|embed\/|v\/)?([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : '';
  }

  onPlayerReady(event: any): void {
    console.log('Player está pronto!');
  }

  onPlayerStateChange(event: any): void {
    console.log('Estado do player:', event.data);
    if (event.data == 0) {
      if (
        this.dados_completos.topicos?.[this.moduloService.controll_topico]
          ?.VideoUrls[this.currentVideoIndex].UsuarioVideos[0].completo == false
      ) {
        this.finalizarVideo(
          this.dados_completos.user.ltiUserId,
          this.dados_completos.topicos?.[this.moduloService.controll_topico]
            ?.VideoUrls[this.currentVideoIndex].id,
          this.dados_completos.user.ltik
        ).subscribe((response) => {
          console.log('Vídeo finalizado:', response);
          this.removeDadosCompletos();
          this.setDadosCompletos(response);
        });
      }
      /*       setTimeout(() => {
        this.proximo();
      }, 3000); */
    }
  }

  proximo(): void {
    console.log(this.currentVideoIndex);
    if (
      this.currentVideoIndex <
      this.dados_completos.topicos?.[this.moduloService.controll_topico]
        ?.VideoUrls.length
    ) {
      console.log('Entrei');
      this.currentVideoIndex++;
      this.recreatePlayer();
    }
    this.salvarProgressoVideos().subscribe((response) => {
      console.log('Progresso salvo:', response);
      this.removeDadosCompletos();
      this.setDadosCompletos(response);
    });
  }

  voltar(): void {
    if (this.currentVideoIndex - 1 >= 0) {
      console.log(this.currentVideoIndex);
      this.currentVideoIndex = this.currentVideoIndex - 1;
      this.recreatePlayer();
    }

    this.salvarProgressoVideos().subscribe((response) => {
      console.log('Progresso salvo:', response);
      this.removeDadosCompletos();
      this.setDadosCompletos(response);
    });
  }

  fichaTecnica() {
    this.controllerSwitchHome = 1;
  }
  sobre() {
    this.controllerSwitchHome = 2;
  }

  enviarAvaliacao(avaliacao: any): Observable<any> {
    console.log(this.dados_completos);
    const body = {
      id_user_modulo: this.dados_completos.userModulo.id,
      avaliacao: avaliacao.avaliacao,
      comentario: avaliacao.comentario || '',
      ltik: this.dados_completos.user.ltik,
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.dados_completos.user.ltik,
    });

    console.log(body);
    return this.http.post(`${this.apiUrl}/enviar_avaliacao`, body, {
      headers,
    });
  }
  verificaAvaliacaoNaoFoiFeitaEstrelas(): boolean {
    if (this.dados_completos.userModulo.avaliacao == null) {
      return true;
    } else {
      return false;
    }
  }
  private webhookUrl = 'https://tecnocomp.uea.edu.br:5678/webhook/1cf5320a-77b7-4a3d-98ba-a5a9f83600ac';
  desativa_chat = false;

  enviarResposta(payload: {
    pergunta: string;
    respostaAluno: string;
    teto : number;
  }): Observable<any> {
    return this.http.post<any>(this.webhookUrl, payload);
  }

  salvarAvaliacaoIA(payload: {
  idTopico: number;
  respostaAluno: string;
  nota: number;
  justificativa: string;
  teto: number;
}): Observable<any> {
  const token = localStorage.getItem('token');

  const body = {
    idTopico: payload.idTopico,
    respostaAluno: payload.respostaAluno,
    nota: payload.nota,
    justificativa: payload.justificativa,
    teto: payload.teto,
    token,
  };

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  });

  return this.http.post(`${this.apiUrl}/api/salvarAvaliacaoIA`, body, {
    headers: headers,
  });
}

getDadosCompletosAsObservable(): void {
    const dadosArmazenados = localStorage.getItem(this.storageKey);

    if (dadosArmazenados) {
      const dadosCompletos = JSON.parse(dadosArmazenados);
      this.dadosCompletosSource.next(dadosCompletos); 
      // console.log('Service data atualizado: ', dadosCompletos);
    } else {
      this.dadosCompletosSource.next(null);
    }
  }

  clearDados() {
    this.dadosCompletosSource.next(null)
  }

}
