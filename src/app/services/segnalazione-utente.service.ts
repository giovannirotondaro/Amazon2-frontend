import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SegnalazioneUtente } from '../domain/SegnalazioneUtente';

@Injectable({
  providedIn: 'root'
})

export class SegnalazioneUtenteService {

  constructor(private httpClient: HttpClient) { }

  inserisciSegnalazione(segnalazione:SegnalazioneUtente){
    return this.httpClient.post<void>("http://localhost:8090/segnalazioni/addSegnalazioneUtente",segnalazione);
  }
}
