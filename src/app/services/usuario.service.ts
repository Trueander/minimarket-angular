import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlEndPoint: string = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) { }

  getUsuarioByUsername(username: string): Observable<Usuario> {
    let params = new HttpParams();
    params = params.set('username', username);
    return this.http.get<Usuario>(this.urlEndPoint+"/buscarUsuario", {params: params});
  }

  login(username: string, password: string): Observable<Usuario> {
    let params = new HttpParams();
    params = params.set('username', username);
    params = params.set('password', password);
    return this.http.get<Usuario>(this.urlEndPoint+"/login", {params: params});
  }

  registrarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.urlEndPoint}/crear `,usuario);
  }

  saveUsuarioLocal(username: string): void {
    sessionStorage.setItem('username', username);
  }

  getUsuarioLocal():  string {
    let username = 'error';
    username = sessionStorage.getItem('username');
    return username;
  }

  logout(): void {
    sessionStorage.removeItem('username');
  }

}
