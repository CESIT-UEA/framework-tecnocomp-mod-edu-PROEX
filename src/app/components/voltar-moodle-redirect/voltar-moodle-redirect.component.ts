import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-voltar-moodle-redirect',
  templateUrl: './voltar-moodle-redirect.component.html',
  styleUrls: ['./voltar-moodle-redirect.component.css']
})
export class VoltarMoodleRedirectComponent implements OnInit{
  ngOnInit(): void {
    window.location.href = 'https://mboepi.uea.edu.br/';
  }

}
