import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  usuario = { login: '', senha: '' };

  constructor(
    private loginservice: LoginServiceService,
    private router: Router
  ) {}

  public login() {
    this.loginservice.login(this.usuario);
  }

  ngOnInit(): void {
    if (
      localStorage.getItem('token') !== null &&
      localStorage.getItem('token')?.toString().trim() !== null
    ) {
      this.router.navigate(['home']);
    }
  }
}
