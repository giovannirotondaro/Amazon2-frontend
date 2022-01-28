import { Injectable } from '@angular/core';
import { Preferito } from '../domain/Preferito';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../domain/User';

@Injectable({
  providedIn: 'root'
})
export class PreferitoService {

  constructor(
    private httpClient:HttpClient
  ) { }

  public aggiungiPreferito(preferito: Preferito){
    return this.httpClient.post<Preferito>("http://localhost:8090/preferito/aggiungiPreferito",preferito);
  }

  public rimuoviPreferito(preferito: Preferito){
    return this.httpClient.post<Preferito>("http://localhost:8090/preferito/rimuoviPreferito",preferito);
  }

  public getPreferiti(username:string){
    let params = new HttpParams();
    params = params.set('username', username);
    return this.httpClient.get<Preferito[]>("http://localhost:8090/preferito/preferitiByUsername",{params})
  }
}
