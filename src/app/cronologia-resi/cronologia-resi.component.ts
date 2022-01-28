import { Component, OnInit } from '@angular/core';
import { Reso } from '../domain/Reso';
import { User } from '../domain/User';
import { ResoService } from '../services/reso.service';
import { UtenteService } from '../services/utente.service';

@Component({
  selector: 'app-cronologia-resi',
  templateUrl: './cronologia-resi.component.html',
  styleUrls: ['./cronologia-resi.component.css']
})
export class CronologiaResiComponent implements OnInit {
  
  resi: Reso[]=[]
  user: any = sessionStorage.getItem("user");
  utente!: User
  
  apriModaleRimborsoEffettuatoBoolean!:boolean
  apriModaleRimborsoGiaEffettuatoBoolean!:boolean
  apriModaleSaldoInsufficienteBoolean!:boolean
  
  constructor(
    private resoService: ResoService, 
    private utenteService:UtenteService,
    ) { 
      
    }

  ngOnInit() {
    this.resoService.getResiByVenditore(this.user).subscribe(    
      response => {        
        this.resi=response;
      });
    
      if (this.user != null){
        this.utenteService.getUtente(this.user).subscribe(
          response => {        
            this.utente=response;
          }
        );
      }
  }

  effettuaRimborso(reso:Reso){
        
      if(reso.rimborsato){
        this.apriModaleRimborsoGiaEffettuato();
      }
      else{
        
        if(this.utente.saldo < reso.prezzo){
          this.apriModaleSaldoInsufficente();
        }
        else{
            this.resoService.effettuaRimborso(reso).subscribe(result=>this.ngOnInit());
            this.apriModaleResoEffettuato();
        }
      }

  }

  apriModaleResoEffettuato(){
    this.apriModaleRimborsoEffettuatoBoolean=true;
  }

  chiudiModaleRimborsoEffettuato(){
    this.apriModaleRimborsoEffettuatoBoolean=false;  
  }

  apriModaleRimborsoGiaEffettuato(){
    this.apriModaleRimborsoGiaEffettuatoBoolean=true;
  }

  chiudiModaleRimborsoGiaEffettuato(){
    this.apriModaleRimborsoGiaEffettuatoBoolean=false;
  }

  apriModaleSaldoInsufficente(){
    this.apriModaleSaldoInsufficienteBoolean=true;
  }
  
  chiudiModaleSaldoInsufficente(){
    this.apriModaleSaldoInsufficienteBoolean=false;
  }
}
