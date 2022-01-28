import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private route: Router,
    private authService: AuthService,
    private loginService: LoginService) { }

  title:any;
  stringa:any;
  textArea:any;
  entraCome: string = "utente";
  isAuthenticate: Boolean = false;
  apriModaleErrore: Boolean = false;
  username!:string
  password!:string
  
  ngOnInit(): void {}

  doLogin() {
    if (this.entraCome === "utente"){
      
      this.loginUtente();
    }
    else if (this.entraCome === "admin"){
      
      this.loginAdmin();
    }
    else if (this.entraCome === "corriere"){
      
      this.loginCorriere();
    }
    else{
      
      this.apriModaleErrore = true;
    }
  }
  
  loginUtente(){
    this.authService.authenticate(this.username, this.password).subscribe(
      response => {
        if (response == true) {
          sessionStorage.setItem("user", this.username);
          NavbarComponent.prova=sessionStorage.getItem("user");
          this.isAuthenticate = true;
          this.route.navigate([''])
          .then(() => {
            window.location.reload();
          });
        }
        else {
          this.isAuthenticate = false;
          this.apriModaleErrore = true;
        }
      }
    )
  }

  loginCorriere(){
    this.authService.authenticateCorriere(this.username, this.password).subscribe(
      response => {
        if (response == true) {
          sessionStorage.setItem("userCorriere", this.username);
          NavbarComponent.prova=sessionStorage.getItem("userCorriere");
          this.isAuthenticate = true;
          this.route.navigate(['areaCorriere'])
          .then(() => {
            window.location.reload();
          });
        }
        else {
          this.isAuthenticate = false;
          this.apriModaleErrore = true;
        }
      }
    )
  }

  loginAdmin(){
    this.authService.authenticateAdmin(this.username, this.password).subscribe(
      response => {
        if (response == true) {
          sessionStorage.setItem("userAdmin", this.username);
          NavbarComponent.prova=sessionStorage.getItem("userAdmin");
          this.isAuthenticate = true;
          this.route.navigate(['gestioneAdmin'])
          .then(() => {
            window.location.reload();
          });
        }
        else {
          this.isAuthenticate = false;
          this.apriModaleErrore = true;
        }
      }
    )
  }

  chiudiModaleErrore(){
    this.apriModaleErrore = false;
  }
}
