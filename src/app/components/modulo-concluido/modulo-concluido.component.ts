import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceAppService } from 'src/app/service-app.service';
import { ModuloService } from 'src/app/personalizavel/modulo.service';

@Component({
  selector: 'app-modulo-concluido',
  templateUrl: './modulo-concluido.component.html',
  styleUrls: ['./modulo-concluido.component.css']
})
export class ModuloConcluidoComponent {
  formAvaliacao!: FormGroup;
  estrelas = new Array(5).fill(0);
  disabled_comentario = false;
  disabled_estrelas = false;
  editar = false;

  constructor(
    public ltiService: ServiceAppService, 
    private fb: FormBuilder,
    private router: Router,
    private moduloService: ModuloService
  ) {}

  ngOnInit() {
    this.ltiService.getDadosCompletos();
    // Verifica se os dois são nulos; Verifica se apenas o comentario é nulo; Traz os dados salvos
    if (this.ltiService.verificaAvaliacaoNaoFoiFeitaEstrelas() && this.verificaAvaliacaoNaoFoiFeitaComentario()){
      this.formAvaliacao = this.fb.group({
        avaliacao: [0, [Validators.required, Validators.min(1)]],
        comentario: [''],
      });
    } else if(this.verificaAvaliacaoNaoFoiFeitaComentario() && this.ltiService.verificaAvaliacaoNaoFoiFeitaEstrelas() == false){
      this.formAvaliacao = this.fb.group({
        avaliacao: [
          this.ltiService.dados_completos.userModulo.avaliacao,
          [Validators.required, Validators.min(1),],
        ],
        comentario: [''],
      });
      this.desativarForm()
    }
     else {
      this.formAvaliacao = this.fb.group({
        avaliacao: [
          this.ltiService.dados_completos.userModulo.avaliacao,
          [Validators.required, Validators.min(1)],
        ],
        comentario: [
          `${this.ltiService.dados_completos.userModulo.comentario}`,
        ],
      });
      this.desativarForm()
    }
  }

  selecionarAvaliacao(valor: number) {
    if (this.disabled_estrelas) {
      return
    }
    this.formAvaliacao.patchValue({ avaliacao: valor });
  }

  enviarAvaliacao() {
    if (this.formAvaliacao.invalid) {
      this.formAvaliacao.markAllAsTouched();
      return;
    }

    const avaliacao = this.formAvaliacao.value;
    this.ltiService.enviarAvaliacao(avaliacao).subscribe((response) => {
      this.ltiService.removeDadosCompletos();
      this.ltiService.setDadosCompletos(response);
      this.ltiService.mensagem(this.editar ? "Avaliação Editada com sucesso!" : "Avaliação enviada com sucesso!")
      this.cancelar()
    });
  }

  voltar() {
    history.back();
  }


  verificaAvaliacaoNaoFoiFeitaComentario(): boolean {
    if (
      this.ltiService.dados_completos.userModulo.comentario == null
    ) {
      return true;
    } else {
      return false;
    }
  }
  ativarForm(){
    this.ativarComentario()
    this.editar = true
    this.formAvaliacao.enable()
  }

  desativarForm(){
    this.desativarComentario()
    this.disabled_estrelas = true;
    this.formAvaliacao.disable()
  }
  ativarEstrelas(){
    this.disabled_estrelas = false;
  }
  ativarComentario(){
    this.disabled_comentario = false;
  }

  desativarEstrelas(){
    this.disabled_estrelas = true;
  }
  desativarComentario(){
    this.disabled_comentario = true;
  }
  cancelar(){
    this.desativarForm()
    this.editar = false
  }

  voltarModulo6() {
    // Define o tópico 6 (índice 5)
    this.moduloService.controll_topico = 5;
    // Navega de volta para os tópicos do módulo
    const nomeModulo = this.ltiService.dados_completos.modulo.nome_modulo;
    this.router.navigate(['/modulo', nomeModulo, 'topicos']);
  }
}
