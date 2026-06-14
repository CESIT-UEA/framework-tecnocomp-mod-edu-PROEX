import { Component, OnInit } from '@angular/core';
import { DownloadPlataformaService } from 'src/app/download-plataforma.service';

@Component({
  selector: 'app-rodape-propaganda',
  templateUrl: './rodape-propaganda.component.html',
  styleUrls: ['./rodape-propaganda.component.css']
})
export class RodapePropagandaComponent implements OnInit{
  constructor(public downloadService: DownloadPlataformaService){}
      
    ngOnInit(): void {
      this.downloadService.initEventInstall()
      this.downloadService.appInstalled()
    }

    abrirNoNavegador() {
      window.open('https://homologacao-ava.uea.edu.br', '_blank');
    }
}
