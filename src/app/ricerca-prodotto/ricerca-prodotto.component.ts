import { Component, Input, OnInit } from '@angular/core';
import { Prodotto } from '../domain/Prodotto';
import { PrimeNGConfig, SelectItem } from 'primeng/api';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ProdottoService } from '../services/prodotto.service';
import { CarrelloService } from '../services/carrello.service';
import {Preferito} from '../domain/Preferito';
import { PreferitoService } from '../services/preferito.service';
import { User } from '../domain/User';
import { ProdottoCarrelloService } from '../services/prodotto-carrello.service';
import { UtenteService } from '../services/utente.service';

@Component({
  selector: 'app-ricerca-prodotto',
  templateUrl: './ricerca-prodotto.component.html',
  styleUrls: ['./ricerca-prodotto.component.css']
})
export class RicercaProdottoComponent implements OnInit {
  products: Prodotto[] = [];
  sortOptionsPrice!: SelectItem[];
  sortOptionsDate!: SelectItem[];
  sortOrder!: number;
  sortField!: string;
  s!: any;
  selectedRange:any;
  priceWord : string = "Ordina per prezzo";
  dateWord: string = "Ordina per data";
  displayDialog: boolean = false;
  avviso!: string;

  preferitoDaAggiungere!:Preferito;
  username: any = "";
  utente!:User

  constructor(private route: ActivatedRoute, 
              private prodottoService: ProdottoService, 
              private carrelloService: CarrelloService,
              private preferitoService:PreferitoService,
              private prodottoCarrelloService:ProdottoCarrelloService,
              private utenteService:UtenteService) {}

  ngOnInit(){
    this.route.queryParamMap.subscribe(params => {
      this.s = params.get('result');
      this.prodottoService.getProdottiByTitolo(this.s.toString()).subscribe(
        response => {
          this.products = response;
        }
      )
    });

    this.sortOptionsPrice = [
      {label: 'Prezzo decrescente', value: '!price'},
      {label: 'Prezzo crescente', value: 'price'}
    ];
    this.sortOptionsDate = [
      {label: 'Data decrescente', value: '!date'},
      {label: 'Data crescente', value: 'date'}
    ];
    this.preferitoDaAggiungere = new Preferito();
    this.utente = new User();

    this.username = sessionStorage.getItem("user");

    if (this.username != null){
      this.utenteService.getUtente(this.username).subscribe(
      response => {        
       this.utente=response;
      }
    );
    }
  } 

  onSortChangePrice(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.products.sort((p1, p2) => {
        if(p1.prezzo > p2.prezzo){
          return -1;
        }
        if(p1.prezzo < p2.prezzo){
          return 1;
        }
        return 0;
      });
    }
    else {
      this.sortOrder = 1;
      this.products.sort((p1, p2) => {
        if(p1.prezzo > p2.prezzo){
          return 1;
        }
        if(p1.prezzo < p2.prezzo){
          return -1;
        }
        return 0;
      });
    }
  }

  onSortChangeDate(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.products.sort((p1, p2) => {
        if(p1.dataAggiunta > p2.dataAggiunta){
          return -1;
        }
        if(p1.dataAggiunta < p2.dataAggiunta){
          return 1;
        }
        return 0;
      });
    }
    else {
      this.sortOrder = 1;
      this.products.sort((p1, p2) => {
        if(p1.dataAggiunta > p2.dataAggiunta){
          return 1;
        }
        if(p1.dataAggiunta < p2.dataAggiunta){
          return -1;
        }
        return 0;
      });
    }
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
          }
        )
      }
    )
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
            this.ngOnInit()
          });
    }
    else{
      this.displayDialog=true;
      this.avviso="Accedi o registrati per aggiungere i tuoi preferiti!";
    }
  }
}
