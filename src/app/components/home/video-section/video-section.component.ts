import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ServiceAppService } from 'src/app/service-app.service';

/**
 * Componente da seção do video que fica localizada na home
 */
@Component({
  selector: 'app-video-section',
  templateUrl: './video-section.component.html',
  styleUrls: ['./video-section.component.css'],
})
export class VideoSectionComponent implements OnInit, AfterViewInit, OnDestroy{
  /**
   * Sendo um componente reutilizavel, podemos inserir a url do video que queremos que seja mostrado
   */
  @Input() videoUrl!: any;

  constructor(public ltiService: ServiceAppService){}

  ngOnInit(): void {
    this.ltiService.loadYouTubeAPICapa()
  }

  ngAfterViewInit(): void {
    this.ltiService.recreatePlayerCapa();
  }

  ngOnDestroy(): void {
    if (this.ltiService.playerCapa) {
      this.ltiService.playerCapa.destroy();
      this.ltiService.playerCapa = null;
    }
  }
}
