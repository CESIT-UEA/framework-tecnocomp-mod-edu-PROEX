import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Componente depreciado, era responsavel por ser o slide do texto de apoio. É um componente reutilizavel
 */
@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css'],
})
export class SlideComponent implements OnInit {
  @Input() caminhoSlide!: any;
  constructor(private sanitizer: DomSanitizer) { }
  teste: any;

  @Output() textoApoioClick = new EventEmitter<void>();

  ngOnInit(): void {
    this.teste = `<div style="
    display:flex;
    flex-direction:collumn;
    justify-content:center;
    position: relative;
    width: 100%;
    background-color: #f9f9f9;
    height: 100%">
     <iframe loading="lazy" style="width: 100%; height: 100%; border: none; padding: 0;margin: 0;"
       src=`+ this.caminhoSlide + ` allow="fullscreen">
     </iframe>
   </div>
   `;
    this.teste = this.sanitizer.bypassSecurityTrustHtml(this.teste);
  }
}
