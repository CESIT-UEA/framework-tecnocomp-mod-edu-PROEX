import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  titulo!: string;
  mensagem!: string;

  constructor(private router: ActivatedRoute){ }

  ngOnInit(): void {
    const tipo = this.router.snapshot.queryParamMap.get('tipo');
    if ( 
      tipo === 'uuid-modulo-nao-encontrado' ||  
      tipo === 'modulo-nao-existe-ou-nao-publicado' || 
      tipo === 'plataforma-invalida'
    ){
      this.error(tipo);
    }
  }


  error(tipo: 'uuid-modulo-nao-encontrado' | 'modulo-nao-existe-ou-nao-publicado' | 'plataforma-invalida'){
    switch (tipo) {
      case 'uuid-modulo-nao-encontrado':
        this.titulo = 'Módulo não encontrado';
        this.mensagem =
          'Não foi possível localizar o módulo solicitado. Configure o UUID do módulo.';
        break
      case 'modulo-nao-existe-ou-nao-publicado': 
        this.titulo = 'Módulo não existe ou não publicado';
        this.mensagem =
          'Este módulo não está disponível no momento.';
        break
      case 'plataforma-invalida':
        this.titulo = 'Plataforma inválida';
         this.mensagem =
          'Não foi possível identificar a plataforma de origem.';
        break
    }
  }
}
