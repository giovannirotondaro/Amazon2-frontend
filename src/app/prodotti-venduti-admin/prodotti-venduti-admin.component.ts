import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Prodotto } from '../domain/Prodotto';
import { RichiestaCorriere } from '../domain/RichiestaCorriere';
import { ProdottoService } from '../services/prodotto.service';
import { RichiestaCorriereService } from '../services/richiesta-corriere.service';
import { UtenteProdottoService } from '../services/utente-prodotto.service';

@Component({
  selector: 'app-prodotti-venduti-admin',
  templateUrl: './prodotti-venduti-admin.component.html',
  styleUrls: ['./prodotti-venduti-admin.component.css']
})
export class ProdottiVendutiAdminComponent implements OnInit {

  prodottiVenduti!: Prodotto[];
  apriModaleSpedizioneBooleana!: boolean;
  apriModaleAnnullaBooleana!:boolean
  utenteProdSelezionato!: any
  usernameUtente!: any;
  ricorda!:string
  items!: MenuItem[];
  listaRichieste: RichiestaCorriere[] = []

constructor(private prodottoService: ProdottoService, private utenteProdottoService: UtenteProdottoService,private route: ActivatedRoute,private router:Router,private richiestaCorriereService:RichiestaCorriereService) { }

ngOnInit(): void {
  this.items = [
    {
        label:'Utenti',
        icon:'pi pi-fw pi-user',
        items:[
            {
                label:'Area personale admin',
                icon:'pi pi-user',
                command:(event)=>{
                    this.router.navigate(['/gestioneAdmin']);
                  },
            },
            {
                label:'Gestisci utenti',
                icon:'pi pi-users',
                command:(event)=>{
                    this.router.navigate(['/gestioneUtenti']);
                  },
            }
        ]
    },
    {
        label:'Prodotti',
        icon:'pi pi-box',
        items:[
            {
                label:'Gestisci prodotti',
                icon:'pi pi-box',
                command:(event)=>{
                  this.router.navigate(['/gestioneProdotti']);
                },
            }
        ]
    },
    {
        label:'Recensioni',
        icon:'pi pi-book',
        items:[
            {
                label:'Gestisci recensioni',
                icon:'pi pi-book',
                command:(event)=>{
                    this.router.navigate(['/approvaRecensione']);
                  },
            }
        ]
    }
];

    this.route.queryParamMap.subscribe(params => {
      this.usernameUtente = params.get('adminProdottiVenUtente');
      this.prodottoService.getProdottiVenduti(this.usernameUtente).subscribe(prodotti => {
        this.prodottiVenduti = prodotti;
      });
    });
    
    this.richiestaCorriereService.getRichiesteCorriere().subscribe(response=>{this.listaRichieste=response});
  }

  setProdottoNonDisponibile(prodotto: Prodotto){
    this.prodottoService.updateProdotto(prodotto, 0).subscribe(response => {this.ngOnInit()});
  }

  

}
