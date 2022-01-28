import { Component, OnInit } from '@angular/core';
import { ProdottoService } from '../services/prodotto.service';
import { Prodotto } from '../domain/Prodotto';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-prodotti-venditore',
  templateUrl: './prodotti-venditore.component.html',
  styleUrls: ['./prodotti-venditore.component.css']
})
export class ProdottiVenditoreComponent implements OnInit {

  prodottiVenditore: Prodotto[]=[];

  user: any = sessionStorage.getItem("user");

  constructor(
    private prodottoService: ProdottoService, 
    private router: Router) { 
  }

ngOnInit(): void {
    this.prodottoService.getProdottiVenduti(this.user).subscribe(prodotti => {
      this.prodottiVenditore = prodotti;
    }); 
  }
}
