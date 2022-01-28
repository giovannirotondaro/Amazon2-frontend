import { Component, OnInit } from '@angular/core';
import { Prodotto } from '../domain/Prodotto';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdottoService } from '../services/prodotto.service';
import { MenuItem} from 'primeng/api';
import { NavbarComponent } from '../navbar/navbar.component';
import { User } from '../domain/User';
import { SegnalazioneUtente } from '../domain/SegnalazioneUtente';
import { Recensione } from '../domain/Recensione';
import { DatePipe } from '@angular/common';
import { CarrelloService } from '../services/carrello.service';
import {Preferito} from '../domain/Preferito';
import { PreferitoService } from '../services/preferito.service';
import { UtenteService } from '../services/utente.service';
import { ProdottoCarrelloService } from '../services/prodotto-carrello.service';
import { RecensioneService } from '../services/recensione.service';
import { SegnalazioneUtenteService } from '../services/segnalazione-utente.service';

@Component({
  selector: 'app-prodotto',
  templateUrl: './prodotto.component.html',
  styleUrls: ['./prodotto.component.css'],
  providers: [DatePipe]
})
export class ProdottoComponent implements OnInit {

  prodotti:Prodotto[]=[]
  prodotto!:Prodotto
  displayBasic!: boolean;
  items!: MenuItem[]
  selectedValue: string = 'default';
  motivazione!: string;
  motivazioneAggiuntiva!: string;
  segnalazioneUtente!:SegnalazioneUtente
  utente!:User
  recensioni: Recensione[]=[]
  recensioneDaAggiungere!:Recensione;
  username: any = "";
  dataCorrente: any;
  displayDialog: boolean = false;
  avviso!: string;
  rating:number;
  preferitoDaAggiungere!:Preferito;
  recensioneGiaPresente: boolean=false;
  recensioniTotali=0
  mediaRecensioniProdotto=0

  constructor(
    private prodottoService:ProdottoService,
    private utenteService:UtenteService,
    private route: ActivatedRoute, 
    private datePipe: DatePipe,
    private preferitoService:PreferitoService,
    private prodottoCarrelloService:ProdottoCarrelloService,
    private recensioneService:RecensioneService,
    private segnalazioneUtenteService:SegnalazioneUtenteService,
    ) 
    { 
      this.prodotto=new Prodotto();
      this.utente = new User();
      this.recensioneDaAggiungere = new Recensione();
      this.dataCorrente= new Date();
      this.dataCorrente = this.datePipe.transform(this.dataCorrente, 'yyyy-MM-dd');
      this.preferitoDaAggiungere = new Preferito();
      this.rating= 3;
      this.recensioniTotali=0;
      this.mediaRecensioniProdotto=0;
  }


  ngOnInit(): void {
    
    this.username = sessionStorage.getItem("user");
    this.dataCorrente = new Date();
    if (this.username != null){
      this.utenteService.getUserByUsername(this.username).subscribe(
      response => {        
       this.utente=response;
      });
    }


    this.route.params.subscribe( params => {
      this.prodottoService.getProdotto(params['id']).subscribe(
          response => {
              this.prodotto=response;
              this.recensioneService.getRecensioni(this.prodotto.id).subscribe(    
              response => {        
                this.recensioni=response;
                var somma=0;
                this.recensioniTotali=0;
                this.mediaRecensioniProdotto=0;
                for(var r of this.recensioni){
                  if(r.approvata){
                      this.recensioniTotali+=1;
                      somma+=r.rating;
                  }
                }
                this.mediaRecensioniProdotto=somma/this.recensioniTotali;
              });
          });
    });
      
    
    this.items = [
      {
        label: 'Segnala utente', icon: 'pi pi-user', command: () => {
          this.showBasicDialog()
        }
      },
      {
        label: 'Segnala prodotto', icon: 'pi pi-box', command: () => {}
      }
    ];

  }

  showBasicDialog() {
    this.displayBasic = true;
  }

  segnalaUtente(){
    this.utenteService.getUserByUsername(NavbarComponent.prova).subscribe(
      response => {
        this.segnalazioneUtente=new SegnalazioneUtente()
        this.segnalazioneUtente.motivazionePrincipale=this.motivazione
        this.segnalazioneUtente.motivazioneAggiuntiva=this.motivazioneAggiuntiva
        this.segnalazioneUtente.utenteCheFaSegnalazione=response
        this.segnalazioneUtente.utenteSegnalato=this.prodotto.vendutoDa
        this.segnalazioneUtenteService.inserisciSegnalazione(this.segnalazioneUtente).subscribe();
        }
    );
  }
  
  aggiungiRecensione() { 
    this.recensioneDaAggiungere.creataDa=this.utente; 
    this.recensioneDaAggiungere.dataAggiunta=this.dataCorrente;
    this.recensioneDaAggiungere.prodottoRecensito=this.prodotto;
    this.recensioneDaAggiungere.approvata=false;
    this.recensioneDaAggiungere.rating=this.rating;
      this.recensioneGiaPresente=false;
      var recensioneIsApporvata = false;
      for(var r of this.recensioni){
        if(r.creataDa.username == this.username && r.prodottoRecensito.id == this.prodotto.id){
          this.recensioneGiaPresente=true;
          recensioneIsApporvata=r.approvata;
        }  
      }

    if(this.recensioneGiaPresente){
      if(recensioneIsApporvata){
        this.displayDialog=true;
        this.avviso="Hai già inserito una recensione per questo prodotto"
      }
      else{
        this.displayDialog=true;
        this.avviso="Hai già inserito una recensione, attendi l'approvazione da parte del team."
      }
      this.recensioneDaAggiungere.recensione=""
    }
    else
    {
      if(this.recensioneDaAggiungere.recensione.length == 0){
        this.displayDialog=true;
        this.avviso="La tua recensione è vuota"
      }
      else{
        this.recensioneService.aggiungiRecensione(this.recensioneDaAggiungere).subscribe(
          result=>{ this.aggiorna()});
        this.recensioneDaAggiungere.recensione = "";
        this.displayDialog=true;
        this.avviso="Recensione inviata con successo. Attendi che la tua recensione venga approvata dal nostro Team!";
      }
    }
  }

  aggiorna() { 
    this.ngOnInit();
  }

  rimuoviRecensione(recens: Recensione) { 
      (async () => { 
          this.recensioneService.rimuoviRecensione(recens).subscribe(result => this.aggiorna());;
    })();
  }
  
  addInCart(id:number){
    let s: any = sessionStorage.getItem('user');
    let prodotto!: Prodotto;
    this.prodottoService.getProdottoNotPath(id).subscribe(
      response => {
        prodotto = response
        this.prodottoCarrelloService.addProdottoInCart(prodotto,s).subscribe(
          response => {
            if(response === "Prodotto aggiunto nel carrello"){
              this.prodottoCarrelloService.getProdottiInCart(s).subscribe(
                response => {
                  NavbarComponent.prodottoCarrello = response;
                }
              )
            }
            this.avviso = response
            this.displayDialog = true;
          })
        })
  }


  aggiungiAiPreferiti(prodotto:Prodotto){
      if(this.utente.username!= null){
        this.preferitoDaAggiungere.user=this.utente; 
        this.preferitoDaAggiungere.prodotto=prodotto;

        this.preferitoService.aggiungiPreferito(this.preferitoDaAggiungere).subscribe(
          result=>{
            if(result){
              this.displayDialog=true;
              this.avviso="Prodotto aggiunto ai preferiti";
            }
            else{
              this.displayDialog=true;
              this.avviso="Prodotto già presente nei preferiti";
            }
            this.aggiorna()
          });
    }
    else{
      this.displayDialog=true;
      this.avviso="Accedi o registrati per aggiungere i tuoi preferiti!";
    }
  }
}
