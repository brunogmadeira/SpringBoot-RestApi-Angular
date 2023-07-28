import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  usuario = { login: '', senha: '' };

  constructor(private loginservice: LoginServiceService) {}

  public login() {
    this.loginservice.login(this.usuario);
    console.log(
      'testelogin  ' + this.usuario.login + ' senha  ' + this.usuario.senha
    );
  }

  ngOnInit(): void {}
}
