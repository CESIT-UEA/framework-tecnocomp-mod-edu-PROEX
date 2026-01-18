import { NgModule, isDevMode, APP_INITIALIZER  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './template/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import { AprendizagemEInformaticaComponent } from './pages/modulos/aprendizagem-e-informatica/aprendizagem-e-informatica.component';
import { HeaderUnidadeComponent } from './template/header-unidade/header-unidade.component';
import {MatTabsModule} from '@angular/material/tabs';
import { ListMenuComponent } from './template/component/list-menu/list-menu.component';
import { SlideComponent } from './components/slide/slide.component';
import {MatDialogModule} from '@angular/material/dialog';
import { SafePipe } from './safe.pipe';
import { SpanAnimationComponent } from './components/span-animation/span-animation.component';
import { SpanAnimationTextoComponent } from './components/span-animation-texto/span-animation-texto.component';
import { SlideUnidadeComponent } from './components/slide-unidade/slide-unidade.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSidenavModule} from '@angular/material/sidenav';
import { BehaviorismoComponent } from './pages/modulos/components/behaviorismo/behaviorismo.component';
import { ConstrutivismoComponent } from './pages/modulos/components/construtivismo/construtivismo.component';
import { SocioconstrutivismoComponent } from './pages/modulos/components/socioconstrutivismo/socioconstrutivismo.component';
import { ConstrucionismoComponent } from './pages/modulos/components/construcionismo/construcionismo.component';
import { AtividadeUnidadeComponent } from './components/atividade-unidade/atividade-unidade.component';
import { HeaderAtividadeComponent } from './template/header-atividade/header-atividade.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { AtividadeUnidadeBancoComponent } from './component/atividade-unidade-banco/atividade-unidade-banco.component';
import { MenuComBarraProgressoTesteComponent } from './component/menu-com-barra-progresso-teste/menu-com-barra-progresso-teste.component';
import { FormsModule } from '@angular/forms';
import { FichaMembrosComponent } from './components/ficha-membros/ficha-membros.component';
import { SaibaMaisComponent } from './pages/modulos/components/saiba-mais/saiba-mais.component';
import { ReferenciasComponent } from './pages/modulos/components/referencias/referencias.component';
import { AtividadeComponent } from './pages/modulos/components/atividade/atividade.component';
import { GeralComponent } from './pages/modulos/components/geral/geral.component';
import { VideoSectionComponent } from './components/home/video-section/video-section.component';
import { SafeUrlPipePipe } from './components/safe-url-pipe.pipe';
import { BotoesSectionComponent } from './components/home/botoes-section/botoes-section.component';
import { FichaTecnicaComponent } from './components/home/ficha-tecnica/ficha-tecnica.component';
import { HttpClientModule } from '@angular/common/http';
import { ForumComponent } from './components/forum/forum.component';
import { TopicoForumComponent } from './components/forum/topico-forum/topico-forum.component';
import { ComentariosComponent } from './components/forum/topico-forum/comentarios/comentarios.component';
import { ErrorComponent } from './components/error/error.component';
import {ReactiveFormsModule } from '@angular/forms';
import { ModuloComponent } from './personalizavel/modulo/modulo.component';
import { TopicoComponent } from './personalizavel/modulo/topico/topico.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import { PaginaInicialComponent } from './components/pagina-inicial/pagina-inicial.component';
import { PerfilUserComponent } from './components/perfil-user/perfil-user.component';
import { SobreComponent } from './components/home/sobre/sobre.component';
import { FooterFichaComponent } from './components/home/footer-ficha/footer-ficha.component';
import { YoutubePlayerComponent } from './components/youtube-player/youtube-player.component';
import { BotaoVoltarAvaComponent } from './components/botao-voltar-ava/botao-voltar-ava.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ModuloConcluidoComponent } from './components/modulo-concluido/modulo-concluido.component';
import { CadastroAvaComponent } from './components/cadastro-ava/cadastro-ava.component';
import { DialogAvaComponent } from './components/dialog-ava/dialog-ava.component';
import { BotaoDownloadPwaComponent } from './components/botao-download-pwa/botao-download-pwa.component';
import {MatInputModule} from '@angular/material/input';
import { QuestaoAbertasComponent } from './components/questao-abertas/questao-abertas.component';
import { ChatN8nComponent } from './components/chat-n8n/chat-n8n.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { LinksNavegacaoTopicosComponent } from './components/links-navegacao-topicos/links-navegacao-topicos.component';
import { ChatPersonalizadoComponent } from './components/chat-personalizado/chat-personalizado.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AprendizagemEInformaticaComponent,
    HeaderUnidadeComponent,
    ListMenuComponent,
    SlideComponent,
    SafePipe,
    SpanAnimationComponent,
    SpanAnimationTextoComponent,
    SlideUnidadeComponent,
    BehaviorismoComponent,
    ConstrutivismoComponent,
    SocioconstrutivismoComponent,
    ConstrucionismoComponent,
    AtividadeUnidadeComponent,
    HeaderAtividadeComponent,
    AtividadeUnidadeBancoComponent,
    MenuComBarraProgressoTesteComponent,
    FichaMembrosComponent,
    SaibaMaisComponent,
    ReferenciasComponent,
    AtividadeComponent,
    GeralComponent,
    VideoSectionComponent,
    SafeUrlPipePipe,
    BotoesSectionComponent,
    FichaTecnicaComponent,
    ForumComponent,
    TopicoForumComponent,
    ComentariosComponent,
    ErrorComponent,
    ModuloComponent,
    TopicoComponent,
    PaginaInicialComponent,
    PerfilUserComponent,
    SobreComponent,
    FooterFichaComponent,
    YoutubePlayerComponent,
    BotaoVoltarAvaComponent,
    ModuloConcluidoComponent,
    CadastroAvaComponent,
    DialogAvaComponent,
    BotaoDownloadPwaComponent,
    QuestaoAbertasComponent,
    ChatN8nComponent,
    LinksNavegacaoTopicosComponent,
    ChatPersonalizadoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatTabsModule,
    MatDialogModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatProgressBarModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatExpansionModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    MatInputModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

