import { Component, OnInit } from '@angular/core';
import { Prodotto } from '../domain/Prodotto';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProdottoService } from '../services/prodotto.service';
import { CarrelloService } from '../services/carrello.service';
import {Preferito} from '../domain/Preferito';
import { PreferitoService } from '../services/preferito.service';
import { User } from '../domain/User';
import { ProdottoCarrelloService } from '../services/prodotto-carrello.service';
import { UtenteService } from '../services/utente.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})


export class HomepageComponent implements OnInit {
  
  products: Prodotto[] = [];
  discProducts: Prodotto[] = [];
  discPrices: number[] = [];
  responsiveOptions;
  displayDialog: boolean = false;
  avviso!: string;
  preferitoDaAggiungere!:Preferito;
  username: any = "";
  utente!:User

  constructor(private prodottoService:ProdottoService, private carrelloService: CarrelloService,
    private preferitoService:PreferitoService,private prodottoCarrelloService:ProdottoCarrelloService,private utenteService:UtenteService) {
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
    ];

    this.preferitoDaAggiungere = new Preferito();
    this.utente = new User();
  }


  ngOnInit(){
    this.prodottoService.getProdotti().subscribe(
      response => {
      this.products=response;
      this.getMoreDiscounted();
    }) 
    this.username = sessionStorage.getItem("user");

    if (this.username != null){
      this.utenteService.getUtente(this.username).subscribe(
      response => {        
       this.utente=response;
      }
    );
    }
  }

  getMoreDiscounted(){
    this.products.forEach(val => this.discProducts.push(Object.assign({}, val)));
    this.discProducts.sort((p1, p2) => {
      if (p1.sconto > p2.sconto){
        return -1;
      } 
      if (p1.sconto < p2.sconto){
        return 1;
      }
      return 0;
    });
    this.discProducts = this.discProducts.slice(0,3);
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