import { Component, OnInit } from '@angular/core';
import { Observable, ObservedValuesFromArray } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { User } from 'src/app/model/User';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent implements OnInit {
  students!: Array<User>;
  busca!: String;
  currentPage!: number;
  totalItems!: number;
  total!: Number;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.listar(1);
  }

  deleteUsuario(id: Number) {
    if (confirm('Deseja mesmo remover?')) {
      this.usuarioService.deletarUsuario(id).subscribe((resposta) => {
        console.log('Retorno do método delete : ' + resposta);
        this.listar(this.currentPage);
      });
    }
  }

  consultarUser() {
    this.usuarioService.consultarUser(this.busca).subscribe((resposta: any) => {
      this.students = resposta;
    });
  }
  listar(pagina: number) {
    this.usuarioService
      .getUsuarioPagina(pagina - 1)
      .subscribe((resposta: any) => {
        this.students = resposta.content;
        this.totalItems = resposta.totalElements;
        this.currentPage = pagina;
      });
  }

  /*   carregarPagina(currentPage) {
    console.info('Pagnina ->' + pagina);
  } */
}
