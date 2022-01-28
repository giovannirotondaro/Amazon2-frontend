import { HttpClient, HttpParams, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RichiestaCorriere } from '../domain/RichiestaCorriere';

@Injectable({
  providedIn: 'root'
})
export class RichiestaCorriereService {

  constructor(private httpClient: HttpClient) { }

  public getRichiesteCorriere(){
    return this.httpClient.get<RichiestaCorriere[]>("http://localhost:8090/richiestaCorriere/ottieniTutteRichieste")
  }

  public aggiungiRichiestaCorriere(richiesta:RichiestaCorriere){
    return this.httpClient.post<RichiestaCorriere>("http://localhost:8090/richiestaCorriere/aggiungiRichiestaCorriere",richiesta);
  }

  public updateColloquio(richiestaCorriere: RichiestaCorriere){
    return this.httpClient.put<HttpStatusCode>("http://localhost:8090/richiestaCorriere/updateColloquio", richiestaCorriere);
  }

  public updateColloquioModificaAppuntamento(richiestaCorriere: RichiestaCorriere){
    return this.httpClient.put<HttpStatusCode>("http://localhost:8090/richiestaCorriere/updateColloquioModificaAppuntamento", richiestaCorriere);
  }

  public getRichiesteCorriereAppuntamento(){
    return this.httpClient.get<RichiestaCorriere[]>("http://localhost:8090/richiestaCorriere/hannoAppuntamento")
  }

  public rimuoviRichiestaCorriere(id:number){
    let params = new HttpParams();
    params = params.set('id', id);
    return this.httpClient.delete<HttpStatusCode>("http://localhost:8090/richiestaCorriere/rimuoviRichiesta",{params});
  }

  public rimuoviRichiestaCorriereSenzaEmail(id:number){
    let params = new HttpParams();
    params = params.set('id', id);
    return this.httpClient.delete<HttpStatusCode>("http://localhost:8090/richiestaCorriere/rimuoviRichiestaSenzaEmail",{params});
  }

  public eliminaAppuntamentoCorriere(richiestaCorriere: RichiestaCorriere){
    return this.httpClient.put<HttpStatusCode>("http://localhost:8090/richiestaCorriere/rimuoviAppuntamento",richiestaCorriere);
  }

  public getRichiestaCorriereByEmail(email:string){
    let params = new HttpParams();
    params = params.set('emailCorriere', email);
    return this.httpClient.get<boolean>("http://localhost:8090/richiestaCorriere/richiestaCorriereByEmail",{params});
  }
}
