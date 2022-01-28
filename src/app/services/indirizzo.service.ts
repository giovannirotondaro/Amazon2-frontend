import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Indirizzo } from '../domain/Indirizzo';
import { User } from '../domain/User';

@Injectable({
  providedIn: 'root'
})
export class IndirizzoService {

  constructor(private httpClient: HttpClient) { }

  addIndirizzo(indirizzo: Indirizzo, username: string){
    let params = new HttpParams();
    params = params.set("username", username);
    return this.httpClient.put<string>("http://localhost:8090/indirizzo/addIndirizzo", indirizzo, {params: params, responseType: 'text' as 'json'});
  }

  addIndForReg(user: User){
    return this.httpClient.post<Indirizzo>("http://localhost:8090/indirizzo/addIndForReg", user);
  }

  putIndForReg(user:User,id:number){
    let params = new HttpParams();
    params = params.set('id', id);
    return this.httpClient.put<Boolean>("http://localhost:8090/indirizzo/updateIndirizzo", user,{params:params});
  }

  getIndirizzoByUsername(username: string){
    let params = new HttpParams();
    params = params.set("username", username);
    return this.httpClient.get<Boolean>("http://localhost:8090/indirizzo/existsIndirizzo", {params});
  }
}

