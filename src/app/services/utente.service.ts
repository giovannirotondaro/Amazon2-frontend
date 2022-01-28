import { HttpClient, HttpHeaders, HttpParams, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../domain/User';

@Injectable({
    providedIn: 'root'
  })

  export class UtenteService {
    constructor(
      private httpClient: HttpClient
    ){}

    getUsers(){
      return this.httpClient.get<User[]>("http://localhost:8090/utenti/allUsers")
    }

    getUser(id:number){
      let params = new HttpParams();
      params = params.set('id', id);
      return this.httpClient.get<User>("http://localhost:8090/utenti/user",{params});
    }

    getUserByUsername(username:string){
      let params = new HttpParams();
      params = params.set('username', username);
      return this.httpClient.get<User>("http://localhost:8090/utenti/userByUsername",{params});
    }

    getUserByEmail(email:string){
      let params = new HttpParams();
      params = params.set('email', email);
      return this.httpClient.get<User>("http://localhost:8090/utenti/userByEmail",{params});
    }

    bloccaUser(id:number){
      let params = new HttpParams();
      params = params.set('id', id);
      return this.httpClient.post<boolean>("http://localhost:8090/utenti/blocca",null,{params:params});
    }

    modificaDatiPersonali(utente: User){
      return this.httpClient.put<User>("http://localhost:8090/utenti/modificaUtente", utente);
    }

    eliminaUtente(utente: User){
      return this.httpClient.post<boolean>("http://localhost:8090/utenti/cancellazioneAccount",utente);
    }

    updateUser(user: User, saldo: number){
      let params = new HttpParams();
      params = params.set("saldo", saldo);
      return this.httpClient.put<User>("http://localhost:8090/utenti/updateUserSaldo", user, {params: params});
    }

    updateUserSaldoPunti(user: User, saldo: number, punti: number){
      let params = new HttpParams();
      params = params.set("saldo", saldo);
      params = params.set("punti", punti);
      return this.httpClient.put<User>("http://localhost:8090/utenti/updateUserSaldoPunti", user, {params: params});
    }

    updateUserPunti(user: User, punti: number){
      let params = new HttpParams();
      params = params.set("punti", punti);
      return this.httpClient.put<User>("http://localhost:8090/utenti/updateUserPunti", user, {params: params});
    }

    updatePassword(user: User, oldPass: string, newPass: string){
      let params = new HttpParams();
      params = params.set("oldPass", oldPass);
      params = params.set("newPass", newPass);
      return this.httpClient.put<string>("http://localhost:8090/utenti/modificaPassword", user, {params: params, responseType: 'text' as 'json'});
    }

    public getUtente(username:string){
      return this.httpClient.get<User>(`http://localhost:8090/utenti/utente/${username}`);
    }

    public generaCodice(email:string) {
      let params = new HttpParams();
      params = params.set('email', email);
      return this.httpClient.get<number>("http://localhost:8090/utenti/generaCodice",{params});
    }

    public registraUtente(user: User){
      return this.httpClient.post<User>("http://localhost:8090/utenti/registraUtente",user);
    }

    public recuperaUsername(email:string){
      let params = new HttpParams();
      params=params.set('email',email);
      return this.httpClient.get<HttpStatusCode>("http://localhost:8090/utenti/recuperaUsername",{params});
    }
  
    public recuperaPassword(email:string){
      let params = new HttpParams();
      params=params.set('email',email);
      return this.httpClient.put<HttpStatusCode>("http://localhost:8090/utenti/recuperaPassword",null,{params:params});
    }
  }