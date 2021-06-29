import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Compra } from '../models/compra';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  private urlEndPoint: string = 'http://localhost:8080/api/compras';

  constructor(private http: HttpClient) { }

  crearCompra(compra: Compra): Observable<Compra> {
    return this.http.post<Compra>(this.urlEndPoint+"/crear", compra);
  }
}
