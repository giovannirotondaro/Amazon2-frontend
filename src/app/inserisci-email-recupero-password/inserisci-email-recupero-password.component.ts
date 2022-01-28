import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inserisci-email-recupero-password',
  templateUrl: './inserisci-email-recupero-password.component.html',
  styleUrls: ['./inserisci-email-recupero-password.component.css']
})
export class InserisciEmailRecuperoPasswordComponent implements OnInit {
  
  emailInserita!:string
  campoEmailMancante:boolean=false
  stringa:string="Inserisci un campo email valido"

  constructor(private router:Router) {}

  ngOnInit(): void {
  }

  controllaCodice(){
    if(this.emailInserita===undefined){
      this.campoEmailMancante=true
    }
    else{
      this.router.navigate(["/recuperaPassword"], {queryParams: {result: this.emailInserita},skipLocationChange: true});
    }
  }
}
