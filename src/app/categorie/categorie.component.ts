import { Component, OnInit } from '@angular/core';
import { Prodotto } from '../domain/Prodotto';
import { ProdottoService } from '../services/prodotto.service';
import { ActivatedRoute } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { NavbarComponent } from '../navbar/navbar.component';
import { CarrelloService } from '../services/carrello.service';

import {Preferito} from '../domain/Preferito';
import { PreferitoService } from '../services/preferito.service';
import { User } from '../domain/User';
import { ProdottoCarrelloService } from '../services/prodotto-carrello.service';
import { UtenteService } from '../services/utente.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {

  categoria: string = "";
  products: Prodotto[] = [];
  searchedProducts: Prodotto[] = [];
  sortOptionsPrice!: SelectItem[];
  sortOptionsDate!: SelectItem[];
  sortOrder!: number;
  sortField!: string;
  selectedRange:any;
  avviso!: string;
  displayDialog: boolean = false;

  preferitoDaAggiungere!:Preferito;
  username: any = "";
  utente!:User
  
  constructor(private prodottoService : ProdottoService, 
              private carrelloService: CarrelloService, 
              private route: ActivatedRoute,
              private preferitoService:PreferitoService,
              private prodottoCarrelloService:ProdottoCarrelloService,
              private utenteService:UtenteService,
              ) {
    this.route.paramMap.subscribe(params => { //ogni volta che i parametri della route cambiano, viene richiamato ngOnInit
      if (!(this.categoria == "")){
        this.ngOnInit();
      }
    });
    this.preferitoDaAggiungere = new Preferito();
    this.utente = new User();
  }

  ngOnInit(): void {
    this.selectedRange='ciao';
    this.categoria = this.route.snapshot.params['categoria']; //SI RIFERISCE A QUELLO DI APP-ROUTING-MODULE :categoria)
    this.prodottoService.getProdottiByCategoria(this.categoria).subscribe(
      response => {
        this.products=response;
      }
    );
    this.sortOptionsPrice = [
      {label: 'Prezzo decrescente', value: '!price'},
      {label: 'Prezzo crescente', value: 'price'}
    ];
    this.sortOptionsDate = [
      {label: 'Data decrescente', value: '!date'},
      {label: 'Data crescente', value: 'date'}
    ];

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
      this.sortField = value.substring(1, value.length);
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
      this.sortField = value;
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
      this.sortField = value.substring(1, value.length);
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
      this.sortField = value;
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
