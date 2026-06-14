import { Component } from '@angular/core';

@Component({
  selector: 'app-tutorial-de-uso',
  templateUrl: './tutorial-de-uso.component.html',
  styleUrls: ['./tutorial-de-uso.component.css']
})
export class TutorialDeUsoComponent {
    fotosApp: string[] = [
      '../../../assets/tela-modulo-inicial.png',
      '../../../assets/tela-topicos.png',
      '../../../assets/tela-atividade.png',
      '../../../assets/tela-sabia.png'
    ]
}
