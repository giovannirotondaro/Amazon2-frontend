import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Prodotto } from '../domain/Prodotto';
import { ProdottoCarrello } from '../domain/ProdottoCarrello';
import { ProdottoService } from '../services/prodotto.service';
import { CarrelloService } from '../services/carrello.service';
import { ProdottoCarrelloService } from '../services/prodotto-carrello.service';

interface Quantita {
  name: string,
  code: number
}

@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.component.html',
  styleUrls: ['./carrello.component.css']
})

export class CarrelloComponent implements OnInit {

  carrello: ProdottoCarrello[] = [];
  quantitaProdotto: Map<number,Quantita[]> = new Map<number,Quantita[]>();
  selectedQuantita!: Quantita;  
  totale: number = 0;
  disponibile: boolean = true;
  constructor(private router: Router,private prodottoCarrelloService:ProdottoCarrelloService,) {}

  ngOnInit(): void {
    let s: any = sessionStorage.getItem('user');
    this.prodottoCarrelloService.getProdottiInCart(s).subscribe(
      response => {
        this.carrello = response;
        for(let i=0; i<this.carrello.length; i++){
          if(!this.carrello[i].prodotto.disponibile){
            this.disponibile = false;
          }
          let quantities: Quantita[] = [];
          for(let j=0; j<this.carrello[i].prodotto.quantita; j++){
            let quantita: Quantita = {name: 'Quantità: ' + (j+1), code: j+1}
            quantities.push(quantita)
          }
          let price: number = this.carrello[i].prodotto.prezzo - (this.carrello[i].prodotto.prezzo * (this.carrello[i].prodotto.sconto / 100))
          this.totale += price * this.carrello[i].quantita;
          this.quantitaProdotto.set(this.carrello[i].prodotto.id, quantities)
        }
      }
    )
  }

  getQuantita(id: number){
    return (<Quantita[]> this.quantitaProdotto.get(id));
  }

  removeProduct(idCarrello:number, idProdotto:number){
    this.prodottoCarrelloService.deleteProdottoInCart(idCarrello, idProdotto).subscribe(
      response => {
        window.location.reload();
      }
    )
  }

  updateQuantity(prodotto: Prodotto, idCarrello:number, event: any){
    let q: number = (<number> event.value);
    this.prodottoCarrelloService.updateProdottoInCart(prodotto, idCarrello, q).subscribe(
      response => {
        window.location.reload();
      }
    )
  }
}
