import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { AprendizagemEInformaticaService } from 'src/app/pages/modulos/aprendizagem-e-informatica/aprendizagem-e-informatica.service';
import { ModuloService } from 'src/app/personalizavel/modulo.service';
import { ServiceAppService } from 'src/app/service-app.service';

/**
 * Componente que contem a barra de progresso
 */
@Component({
  selector: 'app-menu-com-barra-progresso-teste',
  templateUrl: './menu-com-barra-progresso-teste.component.html',
  styleUrls: ['./menu-com-barra-progresso-teste.component.css'],
})
export class MenuComBarraProgressoTesteComponent implements OnInit {
  teste: any;
  /** Quantidade total de módulos do curso (fixo conforme especificação). */
  readonly totalModulos = 6;
  /**
   * @constructor
   */

  @Output() fecharMenu = new EventEmitter<void>();

  @Output() navegarModulo = new EventEmitter<number>();

  @Input() verificaMenuHome = false;
  ola(i: number) {
    console.log(i);
    console.log(this.verificarConcluido(i))
  }
  constructor(
    /**
     * Variavel que instancia o service AprendizagemEmInformaticaService
     */
    public aprendizagemInformatica: AprendizagemEInformaticaService,

    /**
     * Variavel que instancia o service ServiceAppService, que contém as configurações LTI
     */
    public ltiService: ServiceAppService,
    public moduloService: ModuloService
  ) {}

  ngOnInit(): void {}

  verificarConcluido(i: number) {
    if (
      this.ltiService.dados_completos?.userTopico[i]?.UsuarioTopicos[0]
        .encerrado
    ) {
      return true;
    }

    if (
      this.ltiService.dados_completos?.userTopico[i - 1]?.UsuarioTopicos[0]
        .encerrado == true &&
      this.ltiService.dados_completos?.userTopico[i]?.UsuarioTopicos[0]
        .encerrado == false && i != 0
    ) {
      return true;
    }

    if (this.ltiService.dados_completos?.userTopico[i]?.UsuarioTopicos[0]
      .encerrado == false && i == 0) {
      return true
    }

    return false;
  }

  getQuantidadeVideosConcluidos() {
    if (!this.ltiService.dados_completos?.userTopico) {
      return 0;
    }

    return this.ltiService.dados_completos.userTopico.reduce(
      (total: number, topico: any) =>
        topico?.UsuarioTopicos?.[0]?.encerrado ? total + 1 : total,
      0
    );
  }

  /**
   * Calcula o progresso de módulos concluídos em porcentagem.
   * Cada módulo concluído adiciona 16,66% (100 / 6).
   */
  getProgressoModulos(): number {
    const concluido = this.getQuantidadeVideosConcluidos();
    const progresso = (concluido / this.totalModulos) * 100;

    // Garante limite máximo de 100% e arredonda para duas casas.
    return Math.min(parseFloat(progresso.toFixed(2)), 100);
  }
}
