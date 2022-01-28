import { HttpClient, HttpHeaders, HttpParams, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Prodotto } from '../domain/Prodotto';
import { ProdottoCarrello } from '../domain/ProdottoCarrello';

@Injectable({
  providedIn: 'root'
})
export class ProdottoCarrelloService {

  constructor(private httpClient: HttpClient) { }

  getProdottiInCart(username: string){
    const header = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    let params = new HttpParams();
    params = params.set('username', username);
    return this.httpClient.get<ProdottoCarrello[]>("http://localhost:8090/prodottoCarrello/all", {params});
  }

  deleteProdottoInCart(idCarrello: number, idProdotto: number){
    let params = new HttpParams();
    params = params.set('idCarrello', idCarrello);
    params = params.set('idProdotto', idProdotto);
    return this.httpClient.delete<HttpStatusCode>("http://localhost:8090/prodottoCarrello/deleteProductInCart", {params});
  }

  getAllProdottiInCart(){
    return this.httpClient.get<ProdottoCarrello[]>("http://localhost:8090/prodottoCarrello/allProdottiCarrello");
  }

  updateProdottoInCart(prodotto: Prodotto, idCarrello: number, quantita: number){
    let params = new HttpParams();
    params = params.set('idCarrello', idCarrello);
    params = params.set('quantita', quantita);
    return this.httpClient.put<HttpStatusCode>("http://localhost:8090/prodottoCarrello/updateQuantity", prodotto, {params: params});
  }

  addProdottoInCart(prodotto: Prodotto, username: string){
    let params = new HttpParams();
    params = params.set('username', username);
    return this.httpClient.post<string>("http://localhost:8090/prodottoCarrello/addProductInCart", prodotto, {params: params, responseType: 'text' as 'json'});
  }
}
