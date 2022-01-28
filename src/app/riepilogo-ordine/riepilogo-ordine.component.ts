import { Component, OnInit } from '@angular/core';
import { ProdottoCarrello } from '../domain/ProdottoCarrello';
import { User } from '../domain/User';
import { CarrelloService } from '../services/carrello.service';
import { UtenteService } from '../services/utente.service';
import { IndirizzoService } from '../services/indirizzo.service';
import { Indirizzo } from '../domain/Indirizzo';
import { CartaCreditoService } from '../services/carta-credito.service';
import { CartaCredito } from '../domain/CartaCredito';
import { Router } from '@angular/router';
import { UtenteProdottoService } from '../services/utente-prodotto.service';
import { UtenteProdotto } from '../domain/UtenteProdotto';
import { ProdottoService } from '../services/prodotto.service';
import { AcquistoConfermatoComponent } from '../acquisto-confermato/acquisto-confermato.component';
import { ProdottoCarrelloService } from '../services/prodotto-carrello.service';
import { RegioneService } from '../services/regione.service';
import { ProvinciaService } from '../services/provincia.service';
import { CittaService } from '../services/citta.service';

@Component({
  selector: 'app-riepilogo-ordine',
  templateUrl: './riepilogo-ordine.component.html',
  styleUrls: ['./riepilogo-ordine.component.css']
})
export class RiepilogoOrdineComponent implements OnInit {
  displayDialogConferma: boolean = false;
  carrello: ProdottoCarrello[] = [];
  activeState: boolean[] = [true, false];
  notActive: boolean = true;
  totale: number = 0;
  user!: User;
  displayModalIndirizzo!:boolean;
  displayModalCarta!:boolean;
  citta: string[] = [];
  province: string[] = [];
  regioni: string[] = [];
  mesi: string[] = ["01", "02", "03", "04", "05", "06", "07", "08","09", "10", "11", "12",]
  anni: string[] = [];
  tipiCarta: string[] = ["Mastercard", "Maestro", "American Express", "Visa"]
  meseSelezionato!: string;
  annoSelezionato!: string;
  tipoSelezionato!: string;
  numeroCartaSelezionato: string = "";
  cvvSelezionato: string = "";
  titolareSelezionato: string = "";
  cittaSelezionata!: string;
  provinciaSelezionata!: string;
  regioneSelezionata!: string ;
  capSelezionato : string = "";
  viaSelezionata : string = "";
  existsInd!: boolean;
  displayDialog: boolean = false;
  avviso!: string;
  tabActive: number = 0;
  selectedCarta: any = null;
  carte: CartaCredito[] = [];
  
  constructor(private router: Router, private prodottoService: ProdottoService, 
    private carrelloService: CarrelloService, private indirizzoService: IndirizzoService, 
    private userService: UtenteService, private cartaCreditoService: CartaCreditoService, 
    private utenteProdottoService: UtenteProdottoService,private prodottoCarrelloService:ProdottoCarrelloService,
    private regioneService:RegioneService,private provinciaService:ProvinciaService, private cittaService:CittaService) {}

  ngOnInit(): void {
    let s: any = sessionStorage.getItem('user');

    this.userService.getUserByUsername(s).subscribe(
      response => {
        this.user = response;
      }
    )
    
    for(let i=2022; i<=2050; i++){
      this.anni.push(i.toString());
    }

    this.cartaCreditoService.getCarteByUsername(s).subscribe(
      response => {
        this.carte = response;
        if(response.length !== 0){
          this.selectedCarta = this.carte[0];
        }
      }
    )

    this.indirizzoService.getIndirizzoByUsername(s).subscribe(
      response1 => {
        this.regioneService.getAllRegioni().subscribe(
          response2=>{
            this.regioni=response2;
            if(!response1 || (this.user.indirizzo.via === null)){ //nuova
              this.existsInd = false;
              this.regioneSelezionata = this.regioni[0];
              this.trovaProvincia();
            }
            else{
              this.existsInd = true;
              this.regioneSelezionata = this.user.indirizzo.regione;
              this.provinciaSelezionata = this.user.indirizzo.provincia;
              this.cittaSelezionata = this.user.indirizzo.citta;
              this.viaSelezionata = this.user.indirizzo.via;
              this.capSelezionato = this.user.indirizzo.cap;
              this.trovaProvincia();
            }
          }
        );
      }
    )
  
    this.prodottoCarrelloService.getProdottiInCart(s).subscribe(
      response => {
        this.carrello = response;
        for(let i=0; i<this.carrello.length; i++){
          let price: number = this.carrello[i].prodotto.prezzo - (this.carrello[i].prodotto.prezzo * (this.carrello[i].prodotto.sconto / 100))
          this.totale += price * this.carrello[i].quantita;
        }
      }
    )
  }

  trovaProvincia(){
    this.provinciaService.getAllProvince(this.regioneSelezionata).subscribe(
      response=>{
        this.province=response;
        this.trovaCitta(this.province[0]);
      }
    );
  }

  trovaCitta(provincia: string){
    this.cittaService.getAllCitta(provincia).subscribe(
      response => {
        this.citta = response;
      }
    )
  }

  showModalCartaDialog() {
    this.displayModalCarta = true;
  }

  showModalIndirizzoDialog() {
    this.displayModalIndirizzo = true;
  }

  cambiaPagina(){  
    this.activeState=[false,true];
    this.notActive=false;
  }

  scegliCarta(){}

  isNotActive(){
    return this.notActive;
  }

  mettiIndirizzo(){
    if(this.capSelezionato.length !== 5){
      this.avviso = "CAP non valido";
      this.displayDialog = true;
      return;
    }

    if(this.cittaSelezionata !== "" && this.provinciaSelezionata !== "" && this.regioneSelezionata !== ""  && this.viaSelezionata !== "" && this.capSelezionato !== ""){
      let indirizzo: Indirizzo = new Indirizzo();
      indirizzo.cap = this.capSelezionato;
      indirizzo.citta = this.cittaSelezionata;
      indirizzo.provincia = this.provinciaSelezionata;
      indirizzo.regione = this.regioneSelezionata;
      indirizzo.via = this.viaSelezionata;
      this.indirizzoService.addIndirizzo(indirizzo, this.user.username).subscribe(
        response => {
          if(response === "Indirizzo aggiunto" || response === "Indirizzo modificato"){
              this.ngOnInit();
              this.displayModalIndirizzo = false;
              this.avviso = response;
              this.displayDialog = true;
          }
        }
      )
    }
    else{
      this.avviso = "Inserire tutti i parametri";
      this.displayDialog = true;
    } 
  }

   aggiungiCarta(){
    if(this.numeroCartaSelezionato.length !== 16){
      this.avviso = "Numero di carta non valido";
      this.displayDialog = true;
      return;
    }

    if(this.cvvSelezionato.length !== 3){
      this.avviso = "CVV non valido";
      this.displayDialog = true;
      return;
    }

    if(this.numeroCartaSelezionato !== "" && this.titolareSelezionato !== "" && this.cvvSelezionato !== ""  && this.tipoSelezionato !== "" && this.meseSelezionato !== "" && this.annoSelezionato !== ""){
      let carta: CartaCredito = new CartaCredito();
      carta.titolare = this.titolareSelezionato;
      carta.numeroCarta = this.numeroCartaSelezionato;
      carta.tipologia = this.tipoSelezionato;
      carta.meseScadenza = this.meseSelezionato;
      carta.annoScadenza = this.annoSelezionato;
      carta.cvv = this.cvvSelezionato;
      this.cartaCreditoService.addCarta(carta, this.user.username).subscribe(
        response => {
          if(response === "Carta aggiunta"){
            this.ngOnInit();
            this.displayModalCarta = false;
          }
          this.avviso = response;
          this.displayDialog = true;
        }
      )
    }   
    else{
      this.avviso = "Inserire tutti i parametri";
      this.displayDialog = true;
    } 
  }

  isActiveTab(event: any){
    this.tabActive = event;
  }

  effettuaOrdine(){
    for(let i=0; i<this.carrello.length; i++){
      let utenteProdotto: UtenteProdotto = new UtenteProdotto();
      utenteProdotto.user = this.user;
      
      utenteProdotto.stato = "NIENTE";
      utenteProdotto.quantita = this.carrello[i].quantita;
      utenteProdotto.prodotto = this.carrello[i].prodotto;
      
      this.utenteProdottoService.addUtenteProdotto(utenteProdotto).subscribe(
        response => {
          if(i==this.carrello.length-1){
            for(let j=0; j<this.carrello.length; j++){
              let s: number = this.carrello[j].prodotto.vendutoDa.saldo + ((this.carrello[j].prodotto.prezzo - (this.carrello[j].prodotto.prezzo * (this.carrello[j].prodotto.sconto / 100))) * this.carrello[j].quantita);
              this.userService.updateUser(this.carrello[j].prodotto.vendutoDa, s).subscribe(
                response2=>{
                  if(j==this.carrello.length-1){
                    for(let k=0; k<this.carrello.length; k++){
                      let q: number = this.carrello[k].prodotto.quantita - this.carrello[k].quantita;
                      this.prodottoService.updateProdotto(this.carrello[k].prodotto, q).subscribe(
                        response3=>{
                          if(k==this.carrello.length-1){
                            if(this.tabActive === 1){
                              let saldo: number = this.user.saldo - this.totale;
                              this.userService.updateUserSaldoPunti(this.user, saldo, this.totale).subscribe(
                                response5=>{
                                  this.router.navigate(['/carrello/riepilogo/ordine']).then(() => {
                                    AcquistoConfermatoComponent.totale = this.totale;
                                    AcquistoConfermatoComponent.carrello = this.carrello;
                                  });
                                }
                              );
                            }
                            else{
                              this.userService.updateUserPunti(this.user, this.totale).subscribe(
                                response7 => {
                                  this.router.navigate(['/carrello/riepilogo/ordine']).then(() => {
                                    AcquistoConfermatoComponent.totale = this.totale;
                                    AcquistoConfermatoComponent.carrello = this.carrello;
                                    AcquistoConfermatoComponent.carta = this.selectedCarta;
                                  });
                                } 
                              )
                            }
                          }
                        }
                      );
                    }
                  }
                }
              );
            }
          }
        }
      )
    }
  }

  cancellaCarta(id: number){
    this.cartaCreditoService.deleteCarta(id, this.user.id).subscribe(
      response => {
        this.ngOnInit();
      }
    );
  }
}
