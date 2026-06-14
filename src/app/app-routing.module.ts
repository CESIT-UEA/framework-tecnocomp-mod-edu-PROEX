import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AprendizagemEInformaticaComponent } from './pages/modulos/aprendizagem-e-informatica/aprendizagem-e-informatica.component';
import { BehaviorismoComponent } from './pages/modulos/components/behaviorismo/behaviorismo.component';
import { ConstrutivismoComponent } from './pages/modulos/components/construtivismo/construtivismo.component';
import { SocioconstrutivismoComponent } from './pages/modulos/components/socioconstrutivismo/socioconstrutivismo.component';
import { ConstrucionismoComponent } from './pages/modulos/components/construcionismo/construcionismo.component';
import { ForumComponent } from './components/forum/forum.component';
import { TopicoForumComponent } from './components/forum/topico-forum/topico-forum.component';
import { ComentariosComponent } from './components/forum/topico-forum/comentarios/comentarios.component';
import { ErrorComponent } from './components/error/error.component';
import { ModuloComponent } from './personalizavel/modulo/modulo.component';
import { TopicoComponent } from './personalizavel/modulo/topico/topico.component';
import { PaginaInicialComponent } from './components/pagina-inicial/pagina-inicial.component';
import { CadastroAvaComponent } from './components/cadastro-ava/cadastro-ava.component';
import { ModuloConcluidoComponent } from './components/modulo-concluido/modulo-concluido.component';
import { AppPropagandaComponent } from './components/app-propaganda/app-propaganda.component';

const routes: Routes = [
  { path: '', component: AppPropagandaComponent },
  { path: 'avaliar', component: ModuloConcluidoComponent },
  { path: 'ava/editar/:id', component: CadastroAvaComponent },
  { path: 'ava/adicionar', component: CadastroAvaComponent },
  { path: 'teorias-da-aprendizagemHome', component: HomeComponent },
  {
    path: 'teorias-da-aprendizagem',
    component: AprendizagemEInformaticaComponent,
    children: [
      { path: 'behaviorismo', component: BehaviorismoComponent },
      { path: 'construtivismo', component: ConstrutivismoComponent },
      { path: 'socioconstrutivismo', component: SocioconstrutivismoComponent },
      { path: 'construcionismo', component: ConstrucionismoComponent },
    ],
  },
  {
    path: 'forum',
    component: ForumComponent,
  },
  { path: 'topico/:id', component: TopicoForumComponent },
  { path: 'topico/:id/:id_comentario', component: ComentariosComponent },
  {
    path: 'tecnologias-digitais-de-informação-e-comunicaçãoHome',
    component: HomeComponent,
  },

  { path: 'modulo/:nome_modulo', component: ModuloComponent },
  { path: 'modulo/:nome_modulo/topicos', component: TopicoComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
