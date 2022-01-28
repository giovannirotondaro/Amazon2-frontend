import { Component, OnInit } from '@angular/core';
import { ProdottoService } from '../services/prodotto.service';
import { UtenteProdotto } from '../domain/UtenteProdotto';
import { UtenteProdottoService } from '../services/utente-prodotto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Reso } from '../domain/Reso';
import { ResoService } from '../services/reso.service';

@Component({
  selector: 'app-cronologia',
  templateUrl: './cronologia.component.html',
  styleUrls: ['./cronologia.component.css']
})
export class CronologiaComponent implements OnInit {

    prodottiAcquistati: UtenteProdotto[]=[];
    apriModaleSpedizioneBooleana!: boolean;
    apriModaleAnnullaBooleana!:boolean
    utenteProdSelezionato!: any
    user: any = sessionStorage.getItem("user");
    ricorda!:string
    reso!:Reso
    isPresenteReso=false; 
    apriModaleResoGiaPresenteBoolean!:boolean
    avviso:String="";

  constructor(
    private utenteProdottoService: UtenteProdottoService,
    private resoService:ResoService,
    private router: Router,) { 
      this.reso = new Reso()
    }

  ngOnInit(): void {

    this.utenteProdottoService.getProdottiAcquistati(this.user).subscribe(prodotti => {
        this.prodottiAcquistati = prodotti;
      });  
    }

    apriModaleSpedizione(stato:string) {
      this.apriModaleSpedizioneBooleana = true;
      this.ricorda=stato
    }

    apriModaleAnnulla(utenteProd: UtenteProdotto){
      this.utenteProdSelezionato = utenteProd;
      this.apriModaleAnnullaBooleana = true;
    }

    chiudiModaleAnnullaSi(){
      this.utenteProdottoService.eliminaRigaOrdineDallaCronologia(this.utenteProdSelezionato).subscribe(
        response=>this.ngOnInit()
      );
      this.apriModaleAnnullaBooleana=false
    }

    chiudiModaleAnnullaNo(){
      this.apriModaleAnnullaBooleana=false
    }

    controllaReso(utenteProdotto: UtenteProdotto){

      this.resoService.isPresenteResoByUtenteProdotto(utenteProdotto.id).subscribe(    
        response => {        
         this.reso=response;

          if(this.reso==null){
            this.isPresenteReso=false;
            this.router.navigate(['/reso/' + utenteProdotto.id]);
          }
          else{
            if(this.reso.rimborsato){
              this.avviso="Effettuato";
            }
            else{
              this.avviso="Non ancora effettuato";
            }
            this.isPresenteReso=true;
          }
        }
      );
    }
}
