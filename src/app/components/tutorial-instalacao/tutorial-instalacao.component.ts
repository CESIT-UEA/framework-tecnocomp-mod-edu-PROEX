import { Component } from '@angular/core';

@Component({
  selector: 'app-tutorial-instalacao',
  templateUrl: './tutorial-instalacao.component.html',
  styleUrls: ['./tutorial-instalacao.component.css']
})
export class TutorialInstalacaoComponent {
    activeBotaoMobile: boolean = true;

    orientacoesMobile: string[] = [
      'Acesse esta página pelo navegador',
      'Toque em Instalar o App',
      'Pronto! O app será instalado'
    ]

    orientacoesDesktop: string[] = [
      'Acesse pelo Chrome ou Edge',
      'Clique no ícone de instalar na barra de endereço',
      'O mboepi ficará disponível como aplicativo'
    ]




    ativarMobile(){
      this.activeBotaoMobile = true
    }

    desativarMobile(){
      this.activeBotaoMobile = false;
    }
}
