import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UtenteProdotto } from '../domain/UtenteProdotto';

@Injectable({
  providedIn: 'root'
})
export class UtenteProdottoService {

  constructor(private httpClient: HttpClient) { }

  getProdottiNonAncoraConsegnati(){
    return this.httpClient.get<UtenteProdotto[]>("http://localhost:8090/utenteProdotto/acquistiNonConsegnati");
  }

  addUtenteProdotto(utenteProdotto: UtenteProdotto){
    return this.httpClient.post<UtenteProdotto>("http://localhost:8090/utenteProdotto/aggiungiUtenteProdotto", utenteProdotto);
  }

  acquisisciUtenteProdotto(utenteProdotto: UtenteProdotto){
    return this.httpClient.put<UtenteProdotto>("http://localhost:8090/utenteProdotto/acquisisci", utenteProdotto);
  }

  getProdottiAcquisitiDaUnDeterminatoCorriere(username: string){
    let params = new HttpParams();
    params = params.set('username', username);
    return this.httpClient.get<UtenteProdotto[]>("http://localhost:8090/utenteProdotto/acquisizioniDeterminatoCorriere",{params});
  }

  eliminaRigaOrdineDallaCronologia(utenteProd: UtenteProdotto){
    return this.httpClient.post<UtenteProdotto>("http://localhost:8090/utenteProdotto/rimuoviUtenteProdotto", utenteProd);
  }

  aggiornaStatoSpedizione(utenteProd: UtenteProdotto){
    return this.httpClient.put<UtenteProdotto>("http://localhost:8090/utenteProdotto/modificaStatoSpedizione", utenteProd);
  }

  /*******************************spostati sotto***************************************************/

  getProdottiAcquistati(username: string){
    let params = new HttpParams();
    params = params.set('username', username);
    return this.httpClient.get<UtenteProdotto[]>("http://localhost:8090/utenteProdotto/allCronologiaAcquisti",{params});
  }

  getProdottoAcquistato(id: number){
    let params = new HttpParams();
    params = params.set('id', id);
    return this.httpClient.get<UtenteProdotto>("http://localhost:8090/utenteProdotto/cronologiaAcquisto",{params});
  }
}
