import { LoginService } from './login.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    private loginService: LoginService
  ) { }

  authenticate = (email: string, password: string) => {
    return this.loginService.login(email, password);
  }

  authenticateCorriere = (email: string, password: string) => {
    return this.loginService.loginCorrieri(email, password);
  }

  authenticateAdmin = (email: string, password: string) => {
    return this.loginService.loginAdmin(email, password);
  }

  loggedUser = () => {
    let user = sessionStorage.getItem("user");
    return user;
  }

  loggedCorriere = () => {
    let corriere = sessionStorage.getItem("userCorriere");
    return corriere;
  }

  loggedAdmin = () => {
    let corriere = sessionStorage.getItem("userAdmin");
    return corriere;
  }

  isLogged = () => (sessionStorage.getItem("user") != null) ? true : false;

  isLoggedCorriere = () => (sessionStorage.getItem("userCorriere") != null) ? true : false;

  isLoggedAdmin = () => (sessionStorage.getItem("userAdmin") != null) ? true : false;


  clearAll = () => sessionStorage.removeItem("user");

  clearAllCorriere = () => sessionStorage.removeItem("userCorriere");

  clearAllAdmin = () => sessionStorage.removeItem("userAdmin");
 
}