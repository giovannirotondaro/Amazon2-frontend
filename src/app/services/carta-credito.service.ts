import { Injectable } from '@angular/core';
import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { CartaCredito } from '../domain/CartaCredito';

@Injectable({
  providedIn: 'root'
})
export class CartaCreditoService {

  constructor(private httpClient: HttpClient) { }

  addCarta(cartaCredito: CartaCredito, username: string){
    let params = new HttpParams();
    params = params.set("username", username);
    return this.httpClient.post<string>("http://localhost:8090/cartaCredito/addCarta", cartaCredito, {params: params, responseType: 'text' as 'json'});
  }

  getCarteByUsername(username: string){
    let params = new HttpParams();
    params = params.set("username", username);
    return this.httpClient.get<CartaCredito[]>("http://localhost:8090/cartaCredito/getCartaByUsername", {params});
  }

  deleteCarta(idCarta: number, idUser: number){
    let params = new HttpParams();
    params = params.set("idCarta", idCarta);
    params = params.set("idUser", idUser);
    return this.httpClient.delete<HttpStatusCode>("http://localhost:8090/cartaCredito/deleteCarta", {params});
  }
}