import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient) {}

  getStudentList(): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl);
  }

  getTelefonesList(id: number): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl + 'telefones/id/' + id);
  }

  getStudent(id: Number): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl + id);
  }

  deletarUsuario(id: Number): Observable<any> {
    return this.http.delete(AppConstants.baseUrl + id, {
      responseType: 'text',
    });
  }
  consultarUser(busca: String): Observable<any> {
    return this.http.get(AppConstants.baseUrl + 'usuarioBusca/' + busca);
  }
  salvarUsuario(user: User): Observable<any> {
    return this.http.post<any>(AppConstants.baseUrl, user);
  }
  udpateUsuario(user: User): Observable<any> {
    return this.http.put<any>(AppConstants.baseUrl, user);
  }
  userAutenticado() {
    if (
      localStorage.getItem('token') !== null &&
      localStorage.getItem('token')?.toString().trim() !== null
    ) {
      return true;
    } else {
      return false;
    }
  }
}

/* http://localhost:8082/http://localhost:8082/api-be/usuario/usuarioBusca/bruno */
