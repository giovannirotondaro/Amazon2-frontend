import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpStatusCode } from '@angular/common/http';
import { Corriere } from '../domain/Corriere';

@Injectable({
  providedIn: 'root'
})
export class CorriereService {

  constructor(private httpClient: HttpClient) { }

  getCorriereByUsername(username:string){
    let params = new HttpParams();
    params = params.set('userCorriere', username);
    return this.httpClient.get<Corriere>("http://localhost:8090/corriere/corriereByUsername",{params});
  }

  public aggiungiCorriere(corriere: Corriere){
    return this.httpClient.post<Corriere>("http://localhost:8090/corriere/aggiungiCorriere",corriere);
  }

  public getAllCorrieri(){
    return this.httpClient.get<Corriere[]>("http://localhost:8090/corriere/corrieriAll")
  }

  getCorriereByEmail(email:string){
    let params = new HttpParams();
    params = params.set('emailCorriere', email);
    return this.httpClient.get<boolean>("http://localhost:8090/corriere/corriereByEmail",{params});
  }
}
