import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
  constructor(private http: HttpClient, private router: Router) {}

  login(usuario: any) {
    return this.http
      .post(AppConstants.baseLogin, JSON.stringify(usuario))
      .subscribe(
        (data) => {
          /*Retorno HTTP*/
          var token = JSON.parse(JSON.stringify(data)).Authorization.split(
            ' '
          )[1];

          localStorage.setItem('token', token);

          console.info('token:', localStorage.getItem('token'));
          this.router.navigate(['home']);
        },
        (error) => {
          console.error('Login negado');
          alert('Negado');
        }
      );
  }
}
