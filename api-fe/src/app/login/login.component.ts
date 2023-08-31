import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoginServiceService } from '../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  usuario = { login: '', senha: '' };
  ngAfterViewInit() {
    this.emaillogin.nativeElement.focus();
  }

  constructor(
    private loginservice: LoginServiceService,
    private router: Router
  ) {}

  @ViewChild('passwordInput', { read: ElementRef }) passwordInput!: ElementRef;
  @ViewChild('emaillogin') emaillogin!: ElementRef;

  public login() {
    this.loginservice.login(this.usuario);
  }

  foconasenha() {
    this.passwordInput.nativeElement.focus();
  }

  ngOnInit(): void {
    if (
      localStorage.getItem('token') !== null &&
      localStorage.getItem('token')?.toString().trim() !== null
    ) {
      this.router.navigate(['home']);
    }
  }

  checkEnter(event: KeyboardEvent): void {
    if (
      event.key === 'Enter' &&
      document.activeElement === this.passwordInput.nativeElement
    ) {
      this.login();
    }
  }
}
