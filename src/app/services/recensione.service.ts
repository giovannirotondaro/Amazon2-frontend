import { HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recensione } from '../domain/Recensione';

@Injectable({
  providedIn: 'root'
})
export class RecensioneService {

  constructor(private httpClient: HttpClient) { }

  public getRecensioniNonApprovate(){
    return this.httpClient.get<Recensione[]>("http://localhost:8090/recensioni/recensioniNonApprovate/");
  }

  public approvaRecensione(recensione: Recensione){
    return this.httpClient.put<Recensione>("http://localhost:8090/recensioni/approvaRecensione", recensione);
  }

  public nonApprovaRecensione(recensione: Recensione){
    return this.httpClient.put<Recensione>("http://localhost:8090/recensioni/nonApprovaRecensione", recensione);
  }

  public getRecensioni(id:number){
    let params = new HttpParams();
    params = params.set('id', id);
    return this.httpClient.get<Recensione[]>("http://localhost:8090/recensioni/allRecensioni",{params});
  }

  public aggiungiRecensione(recensione: Recensione){
    return this.httpClient.post<Recensione>("http://localhost:8090/recensioni/aggiungiRecensione",recensione);
  }

  public rimuoviRecensione(recensione: Recensione){
    return this.httpClient.post<Recensione>("http://localhost:8090/recensioni/rimuoviRecensione",recensione);
  }
}
