import { Injectable } from '@angular/core';
import { Reso } from '../domain/Reso';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResoService {

constructor(    
  private httpClient: HttpClient
  ) { }

public aggiungiReso(reso: Reso){
  return this.httpClient.post<Reso>("http://localhost:8090/cronologiaResi/addReso",reso);
}

public getResiByVenditore(username: string){
  let params = new HttpParams();
  params = params.set('username', username);
  return this.httpClient.get<Reso[]>("http://localhost:8090/cronologiaResi/getResiByVenditore",{params});
}

public effettuaRimborso(reso: Reso){
  return this.httpClient.put<Reso>("http://localhost:8090/cronologiaResi/rimborsoReso",reso);
}

public isPresenteResoByUtenteProdotto(id: number){
  let params = new HttpParams();
  params = params.set('id', id);
  return this.httpClient.get<Reso>("http://localhost:8090/cronologiaResi/isPresenteResoByUtenteProdotto",{params});
}

}
