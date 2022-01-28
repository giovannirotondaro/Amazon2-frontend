import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Prodotto } from '../domain/Prodotto';
import { Observable } from 'rxjs';
import { User } from '../domain/User';
import { SegnalazioneUtente } from '../domain/SegnalazioneUtente';
import { Recensione } from '../domain/Recensione';
import { UtenteProdotto } from '../domain/UtenteProdotto';
import { newArray } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class ProdottoService {

  constructor(
    private httpClient: HttpClient
  ){}

  getProdotti(){
    return this.httpClient.get<Prodotto[]>("http://localhost:8090/prodotto/allProdotti")
  }

  getProdotto(id: number): Observable<Prodotto>{
    return this.httpClient.get<Prodotto>(`http://localhost:8090/prodotto/prodottoId/${id}`);
  }

  getProdottoNotPath(id: number): Observable<Prodotto>{
    let params = new HttpParams();
    params = params.set('id', id);
    return this.httpClient.get<Prodotto>("http://localhost:8090/prodotto/prodottoNotPath/", {params});
  }

  getProdottiByCategoria(categoria: string){
    return this.httpClient.get<Prodotto[]>(`http://localhost:8090/prodotto/${categoria}`);
  }

  public inserisciProdotto(prodotto: Prodotto){
    return this.httpClient.post<Prodotto>("http://localhost:8090/prodotto/inserisciProdotto",prodotto);
  }

  getProdottiByTitolo(titolo: string){
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    let params = new HttpParams();
    params = params.set('titolo', titolo);
    return this.httpClient.get<Prodotto[]>("http://localhost:8090/prodotto/ricercaProdotto", {params});
  }

  getProdottiVenduti(username: string){
    let params = new HttpParams();
    params = params.set('username', username);
    return this.httpClient.get<Prodotto[]>("http://localhost:8090/prodotto/elencoVenduti",{params});
  }

  public updateProdotto(prodotto: Prodotto, quantita: number){
    let params = new HttpParams();
    params = params.set('quantita', quantita);
    return this.httpClient.put<Prodotto>("http://localhost:8090/prodotto/updateQuantity", prodotto, {params: params});
  }

  public modificaProdotto(prodotto: Prodotto){
    return this.httpClient.put<Prodotto>("http://localhost:8090/prodotto/updateProdotto", prodotto);
  }
}

