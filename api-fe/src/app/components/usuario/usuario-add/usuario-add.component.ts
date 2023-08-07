import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';
import { User } from 'src/app/model/user';
import { Telefone } from 'src/app/model/telefone';

@Component({
  selector: 'app-usuario-add',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css'],
})
export class UsuarioAddComponent implements OnInit {
  usuario = new User();
  listasTelefones: Array<Telefone> = [];

  constructor(
    private routeActive: ActivatedRoute,
    private userService: UsuarioService
  ) {}

  ngOnInit(): void {
    let id = Number(this.routeActive.snapshot.paramMap.get('id'));
    this.getStudent(id);
  }

  getStudent(id: Number) {
    if (id != null) {
      this.userService.getStudent(id).subscribe((resposta: any) => {
        this.usuario = resposta;
        this.listaTelefone(resposta.id);
      });
    }
  }

  listaTelefone(id: number) {
    this.userService.getTelefonesList(id).subscribe((resposta: any) => {
      this.listasTelefones = resposta;
    });
  }

  voltar() {
    window.location.href = '/usuarioList';
  }

  salvaUser() {
    if (this.usuario.id != null && this.usuario.id.toString().trim() != null) {
      /*Atualzando ou editando*/
      this.userService
        .udpateUsuario(this.usuario)
        .subscribe((resposta: any) => {
          console.info('User atualizado: ' + resposta);
          this.voltar();
          window.open('/home');
        });
    } else {
      this.userService
        .salvarUsuario(this.usuario)
        .subscribe((resposta: any) => {
          this.novo;
          console.info('Gravou user:' + resposta);
          this.voltar();
        });
    }
  }

  novo() {
    this.usuario = new User();
  }
}
