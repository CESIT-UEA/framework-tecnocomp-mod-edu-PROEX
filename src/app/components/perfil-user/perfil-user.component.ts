import { Component, ElementRef, HostListener } from '@angular/core';
import { ServiceAppService } from 'src/app/service-app.service';

@Component({
  selector: 'app-perfil-user',
  templateUrl: './perfil-user.component.html',
  styleUrls: ['./perfil-user.component.css'],
})
export class PerfilUserComponent{
  constructor(private eRef: ElementRef,    public ltiService: ServiceAppService) {}


  @HostListener('document:click', ['$event'])
  clickout(event: MouseEvent) {
    const target = event.target as HTMLElement | null;

    // Fechar ao clicar diretamente no ícone de fechamento dentro do componente
    if (target?.classList?.contains('img_fecha')) {
      this.ltiService.fechaMenuUser();
      return;
    }

    if (
      this.ltiService.perfilUser &&
      !this.eRef.nativeElement.contains(event.target)
    ) {
      this.ltiService.fechaMenuUser();
    }
  }
}
