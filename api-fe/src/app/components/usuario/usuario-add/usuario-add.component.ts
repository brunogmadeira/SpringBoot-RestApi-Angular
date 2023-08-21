import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';
import { User } from 'src/app/model/User';
import { Telefone } from 'src/app/model/telefone';
import { identifierName } from '@angular/compiler';

@Component({
  selector: 'app-usuario-add',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css'],
})
export class UsuarioAddComponent implements OnInit {
  usuario = new User();
  listasTelefones: Array<Telefone> = [];
  telefone = new Telefone();
  currentPage!: number;
  totalItems!: number;

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

  listaTelefone(id: Number) {
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
    this.telefone = new Telefone();
  }

  deleteTelefone(id: Number) {
    if (confirm('Deseja mesmo remover?')) {
      this.userService.deletarTelefone(id).subscribe((resposta: any) => {
        console.log('Retorno do método delete : ' + resposta);
        this.listaTelefone(this.usuario.id);
      });
    } else {
      alert('Operação cancelada');
    }
  }

  adicionarTelefone() {
    this.userService
      .cadastrarTelefone(this.telefone.numero, this.usuario.id)
      .subscribe((resposta: any) => {
        this.novo;
        console.info('Gravou user:' + resposta);
        this.listaTelefone(this.usuario.id);
      });
  }

  addtelAlex() {
    if (this.usuario.telefones === undefined) {
      this.usuario.telefones = new Array<Telefone>();
    }

    this.usuario.telefones.push(this.telefone);
    this.telefone = new Telefone();
  }
}
