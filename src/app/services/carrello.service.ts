import { HttpClient, HttpHeaders, HttpParams, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Prodotto } from '../domain/Prodotto';
import { User } from '../domain/User';
import { Carrello } from '../domain/Carrello';

@Injectable({
  providedIn: 'root'
})
export class CarrelloService {

  constructor(private httpClient: HttpClient) { }
  
  addCarrello(user:User){
    return this.httpClient.post<Carrello>("http://localhost:8090/carrello/addCart", user);
  }

  updateCarrello(user:User,id:number){
    let params = new HttpParams();
    params = params.set('id', id);
    return this.httpClient.put<Boolean>("http://localhost:8090/carrello/updateCart", user,{params:params});
  }
  
  sendEmail(idUser: number, totale: number, idCarta: number){
    let params = new HttpParams();
    params = params.set('idUser', idUser);
    params = params.set('totale', totale);
    params = params.set('idCarta', idCarta);
    return this.httpClient.get<string>("http://localhost:8090/carrello/sendEmail", {params, responseType: 'text' as 'json'});
  }
}