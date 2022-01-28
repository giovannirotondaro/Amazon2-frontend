import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CittaService {

  constructor(private httpClient: HttpClient) { }

  getAllCitta(provincia: string){
    let params = new HttpParams();
    params = params.set("provincia", provincia);
    return this.httpClient.get<string[]>("http://localhost:8090/citta/allCitta", {params});
  }
}
