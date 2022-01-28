import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {

  constructor(private httpClient: HttpClient) { }

  getAllProvince(regione: string){
    let params = new HttpParams();
    params = params.set("regione", regione);
    return this.httpClient.get<string[]>("http://localhost:8090/provincia/allProvince", {params});
  }
}
