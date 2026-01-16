import { Component, inject, NgModule } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ava } from 'src/app/interfaces/ava';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormAva } from 'src/app/interfaces/form-ava';
import { MatSnackBar } from '@angular/material/snack-bar';
import { noOnlyWhitespace } from 'src/app/validators/validator';

@Component({
  selector: 'app-cadastro-ava',
  templateUrl: './cadastro-ava.component.html',
  styleUrls: ['./cadastro-ava.component.css']
})
export class CadastroAvaComponent implements OnInit{
    formAva: FormGroup = new FormGroup({
        nome: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(15), noOnlyWhitespace()]),
        url: new FormControl("", [Validators.required, Validators.minLength(10), noOnlyWhitespace()])
    })
    buttonDisabled: boolean = true
    // recebe o parametro da rota atual 
    idAVa!: number;
    // guarda as configurações do formulário atual
    formCurrent!: FormAva;
    listaAvas: Ava[] = [];
    configForm: FormAva[] = [
          {
            icone: "../../../assets/icons/plus.svg", 
            titulo: "Adicionar AVA",
            alt: "Ícone de adicionar", 
            text_button_one: "Cancelar", 
            text_button_two: "Adicionar",
            buttonCadastro: () => this.adicionarAva()
          },
          {
            icone: "../../../assets/icons/editar.svg",
            titulo: "Editar AVA",
            alt: "Ícone de editar", 
            text_button_one: "Cancelar",
            text_button_two: "Salvar Edição",
            buttonCadastro: () => this.updateAva(this.idAVa)
          }
        ]

    constructor(private route: Router, private activedRoute: ActivatedRoute, private snackBar: MatSnackBar){
      this.formAva.valueChanges.subscribe(()=>{  
          this.validationForms()
      })
    }

    ngOnInit(): void {
        let jsonAva: string = localStorage.getItem('avas')!
        if (jsonAva){
          let avas: Ava[] = JSON.parse(jsonAva)
          this.listaAvas = avas
        }
        
        this.idAVa = Number(this.activedRoute.snapshot.paramMap.get('id')!) - 1
        if(this.idAVa === -1) {
          this.formCurrent = this.configForm[0]
        } else {
          this.formCurrent = this.configForm[1]
          this.getAvaById(this.idAVa)
        }
    }

    get nome(): string{
      return this.formAva.get('nome')?.value!
    }

    get url(): string{
      return this.formAva.get('url')?.value!
    }

    
    adicionarAva(): void{
      if(this.formAva.valid){
        this.listaAvas.push({nome: this.nome?.trim(), url: this.url?.trim()})
        localStorage.setItem('avas', JSON.stringify(this.listaAvas))
        this.clearForms()
        this.openSnackBar("AVA adicionado com sucesso!")
        this.navigationPaginaInicial()
      }
    }

    getAvaById(idAva: number): Ava {
      const avas = JSON.parse(localStorage.getItem('avas')!)
      const ava = avas[idAva]
      this.formAva.setValue(ava)
      return ava
    }

    updateAva(id: number){
      if(this.formAva.valid){
        this.listaAvas.splice(id, 1, this.formAva.value)
        localStorage.setItem('avas', JSON.stringify(this.listaAvas))
        this.clearForms()
        this.navigationPaginaInicial()
        this.openSnackBar("AVA atualizado com sucesso!")
      }
    }

    validationForms(){
        if(this.nome !== this.nome?.trimStart() || this.url !== this.url?.trim() ){
          this.formAva.setValue({nome: this.nome?.trim(), url: this.url?.trim()})
        }
        this.formAva.status === "INVALID" ? this.buttonDisabled = true : this.buttonDisabled = false
    }

    openSnackBar(mensagem: string) {
        this.snackBar.open(mensagem, "OK", { duration: 2500 })
   }

    clearForms(): void{
      this.formAva.setValue({nome: "", url: ""})
    }

    navigationPaginaInicial(): void {
        this.route.navigate(['/'])
    }
}
