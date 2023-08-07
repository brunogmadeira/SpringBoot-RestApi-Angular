import { Component, OnInit } from '@angular/core';
import { Observable, ObservedValuesFromArray } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { User } from 'src/app/model/user';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent implements OnInit {
  students: Array<User> = [];
  busca!: String;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.listaUsuarios();
  }

  deleteUsuario(id: Number) {
    if (confirm('Deseja mesmo remover?')) {
      this.usuarioService.deletarUsuario(id).subscribe((resposta) => {
        console.log('Retorno do método delete : ' + resposta);
        this.listaUsuarios();
      });
    }
  }
  listaUsuarios() {
    this.usuarioService.getStudentList().subscribe((resposta: any) => {
      this.students = resposta;
    });
  }
  consultarUser() {
    this.usuarioService.consultarUser(this.busca).subscribe((resposta: any) => {
      this.students = resposta;
    });
  }
}
