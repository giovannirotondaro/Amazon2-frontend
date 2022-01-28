import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private httpClient:HttpClient
  ) { }

  loginCorrieri(username: string, password: string): Observable<Boolean> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    let params = new HttpParams();
      params = params.set('username', username);
      params = params.set('password', password);
            
      return this.httpClient.get<Boolean>("http://localhost:8090/auth/loginCorrieri", {params});
  }

  loginAdmin(username: string, password: string): Observable<Boolean> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    let params = new HttpParams();
      params = params.set('username', username);
      params = params.set('password', password);
            
      return this.httpClient.get<Boolean>("http://localhost:8090/auth/loginAdmin", {params});
  }

  login(username: string, password: string): Observable<Boolean> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    let params = new HttpParams();
      params = params.set('username', username);
      params = params.set('password', password);
      return this.httpClient.get<Boolean>("http://localhost:8090/auth/loginUtente", {params});
  }
}