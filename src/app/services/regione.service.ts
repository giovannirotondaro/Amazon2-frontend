import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegioneService {

  constructor(private httpClient: HttpClient) { }

  getAllRegioni(){
    return this.httpClient.get<string[]>("http://localhost:8090/regione/allRegione");
  }
}
