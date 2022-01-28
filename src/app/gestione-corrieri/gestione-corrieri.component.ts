import { Component, OnInit } from '@angular/core';
import { UtenteProdotto } from '../domain/UtenteProdotto';
import { CorriereService } from '../services/corriere.service';
import { UtenteProdottoService } from '../services/utente-prodotto.service';
import {MenuItem} from 'primeng/api';
import { Router } from '@angular/router';
import { RichiestaCorriere } from '../domain/RichiestaCorriere';
import { RichiestaCorriereService } from '../services/richiesta-corriere.service';

@Component({
  selector: 'app-gestione-corrieri',
  templateUrl: './gestione-corrieri.component.html',
  styleUrls: ['./gestione-corrieri.component.css']
})
export class GestioneCorrieriComponent implements OnInit {

  constructor(private utenteProdottoService: UtenteProdottoService, private corriereService:CorriereService,private router:Router,private richiestaCorriereService:RichiestaCorriereService) { }

  prodottiAcquistati!: UtenteProdotto[];
  listaRichieste: RichiestaCorriere[] = [];
  user: any = sessionStorage.getItem("user");
  userCorrier: any
  items!: MenuItem[];

  ngOnInit(): void {

      this.items = [
        {
            label:'Gestione Corrieri',
            icon:'pi pi-box',
            items:[
                {
                    label:'Acquisisci Spedizioni',
                    icon:'pi pi-check',
                    command:(event)=>{
                      this.router.navigate(['/gestioneCorrieri']);
                    },
                },
                {
                    label:'Area Personale Corriere',
                    icon:'pi pi-user',
                    command:(event)=>{
                      this.router.navigate(['/areaCorriere']);
                    },
                }
            ]
        },
    ];

    this.richiestaCorriereService.getRichiesteCorriere().subscribe(response=>this.listaRichieste=response);

    this.utenteProdottoService.getProdottiNonAncoraConsegnati().subscribe(prodotti => {
      this.prodottiAcquistati = prodotti;
    });
    
    this.userCorrier=sessionStorage.getItem("userCorriere");
  }

  acquisciProdotto(utenteProdotto:UtenteProdotto){
    this.corriereService.getCorriereByUsername(this.userCorrier).subscribe(
      response=>{
        utenteProdotto.corriere = response;
        this.utenteProdottoService.acquisisciUtenteProdotto(utenteProdotto).subscribe(
          response=>this.ngOnInit()
        );
      }
    );
  }
}
