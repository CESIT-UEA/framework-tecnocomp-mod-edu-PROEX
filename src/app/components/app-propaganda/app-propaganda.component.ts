import { Component, OnInit } from '@angular/core';
import { DownloadPlataformaService } from 'src/app/download-plataforma.service';

@Component({
  selector: 'app-app-propaganda',
  templateUrl: './app-propaganda.component.html',
  styleUrls: ['./app-propaganda.component.css']
})
export class AppPropagandaComponent implements OnInit{
    destaquesVantagensMboepi: string[] = [
      'Funciona como aplicativo',
      'Não ocupa muito espaço',
      'Atualizações automáticas',
      'Acesso rápido aos cursos'
    ]

    principaiVantagens = [
      {
        icone: '../../../assets/icons/icone-notebook-vantagens.svg',
        titulo: 'Experiência de App',
        texto: 'interface otimizada para celular e desktop.'
      },
      {
        icone: '../../../assets/icons/icone-raio-vantagens.svg',
        titulo: 'Mais rápido',
        texto: 'Carregamento ágil e navegação fluida.'
      },
      {
        icone: '../../../assets/icons/icone-sino-vantagens.svg',
        titulo: 'Notificações',
        texto: 'Receba avisos importantes dos cursos.'
      },
      {
        icone: '../../../assets/icons/fechar chat - VERDE.svg',
        titulo: 'Assistente SabIA',
        texto: 'Tire dúvidas sobre os cursos com a IA.'
      },
    ]

    constructor(public downloadService: DownloadPlataformaService){}
    
    ngOnInit(): void {
      this.downloadService.initEventInstall()
      this.downloadService.appInstalled()
    }

    abrirNoNavegador() {
      window.open('https://homologacao-ava.uea.edu.br', '_blank');
    }
}
