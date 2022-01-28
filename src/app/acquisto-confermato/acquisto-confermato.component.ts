import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartaCredito } from '../domain/CartaCredito';
import { ProdottoCarrello } from '../domain/ProdottoCarrello';
import { Prodotto } from '../domain/Prodotto';
import { User } from '../domain/User';
import { CarrelloService } from '../services/carrello.service';
import { UtenteService } from '../services/utente.service';
import { ProdottoService } from '../services/prodotto.service';
import { ProdottoCarrelloService } from '../services/prodotto-carrello.service';

@Component({
  selector: 'app-acquisto-confermato',
  templateUrl: './acquisto-confermato.component.html',
  styleUrls: ['./acquisto-confermato.component.css']
})
export class AcquistoConfermatoComponent implements OnInit {

  constructor(private prodottoService: ProdottoService, private userService: UtenteService, private router: Router, private carrelloService: CarrelloService,private prodottoCarrelloService:ProdottoCarrelloService) { }

  static carta: CartaCredito;
  static totale: number;
  static carrello: ProdottoCarrello[];

  AcquistoConfermatoComponent = AcquistoConfermatoComponent;

  user!: User;

  ngOnInit(): void {
    let s: any = sessionStorage.getItem('user');

    this.userService.getUserByUsername(s).subscribe(
      response => {
        this.user = response;
        if(AcquistoConfermatoComponent.carta === undefined){
          this.carrelloService.sendEmail(this.user.id, AcquistoConfermatoComponent.totale, -1).subscribe(
            response2 => {
              if(response2 === "Email inviata"){
                for(let l=0; l<AcquistoConfermatoComponent.carrello.length; l++){
                  this.prodottoCarrelloService.deleteProdottoInCart(AcquistoConfermatoComponent.carrello[l].carrello.id, AcquistoConfermatoComponent.carrello[l].prodotto.id).subscribe(
                    response3 => {
                      if(l===AcquistoConfermatoComponent.carrello.length -1){
                        this.prodottoCarrelloService.getAllProdottiInCart().subscribe(
                          response4 => {
                            let allCarrelli: ProdottoCarrello[] = response4;
                            this.prodottoService.getProdotti().subscribe(
                              response5 => {
                                let allProdotto: Prodotto[] = response5;
                                for(let i=0; i<AcquistoConfermatoComponent.carrello.length; i++){
                                  for(let j=0; j<allCarrelli.length; j++){
                                    if(allCarrelli[j].prodotto.id === AcquistoConfermatoComponent.carrello[i].prodotto.id){
                                      for(let k=0; k<allProdotto.length; k++){
                                        if(allProdotto[k].id === allCarrelli[j].prodotto.id){                                          
                                          if((allCarrelli[j].quantita > allProdotto[k].quantita) || allProdotto[k].quantita === 0){
                                            this.prodottoCarrelloService.updateProdottoInCart(allCarrelli[j].prodotto, allCarrelli[j].carrello.id,allProdotto[k].quantita).subscribe();
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            )
                          }
                        )
                      }
                    }
                  );
                }
              }
            }
          )
        }
        else{
          this.carrelloService.sendEmail(this.user.id, AcquistoConfermatoComponent.totale, AcquistoConfermatoComponent.carta.id).subscribe(
            response2 => {
              if(response2 === "Email inviata"){
                for(let l=0; l<AcquistoConfermatoComponent.carrello.length; l++){
                  this.prodottoCarrelloService.deleteProdottoInCart(AcquistoConfermatoComponent.carrello[l].carrello.id, AcquistoConfermatoComponent.carrello[l].prodotto.id).subscribe(
                    response3 => {
                      if(l===AcquistoConfermatoComponent.carrello.length -1){
                        this.prodottoCarrelloService.getAllProdottiInCart().subscribe(
                          response4 => {
                            let allCarrelli: ProdottoCarrello[] = response4;
                            this.prodottoService.getProdotti().subscribe(
                              response5 => {
                                let allProdotto: Prodotto[] = response5;
                                for(let i=0; i<AcquistoConfermatoComponent.carrello.length; i++){
                                  for(let j=0; j<allCarrelli.length; j++){
                                    if(allCarrelli[j].prodotto.id === AcquistoConfermatoComponent.carrello[i].prodotto.id){
                                      for(let k=0; k<allProdotto.length; k++){
                                        if(allProdotto[k].id === allCarrelli[j].prodotto.id){
                                          if((allCarrelli[j].quantita > allProdotto[k].quantita) || allProdotto[k].quantita === 0){
                                            this.prodottoCarrelloService.updateProdottoInCart(allCarrelli[j].prodotto, allCarrelli[j].carrello.id,allProdotto[k].quantita).subscribe();
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            )
                          }
                        )
                      }
                    }
                  );
                }
              }
            }
          )
        }
      }
    )
  }
  
  goToHome(){
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    })
  }
}
