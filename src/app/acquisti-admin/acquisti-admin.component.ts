import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route,Params, Router} from '@angular/router';
import { UtenteProdotto } from '../domain/UtenteProdotto';
import { UtenteProdottoService } from '../services/utente-prodotto.service';
import {MenuItem} from 'primeng/api';
import { RichiestaCorriereService } from '../services/richiesta-corriere.service';
import { RichiestaCorriere } from '../domain/RichiestaCorriere';

@Component({
  selector: 'app-acquisti-admin',
  templateUrl: './acquisti-admin.component.html',
  styleUrls: ['./acquisti-admin.component.css']
})
export class AcquistiAdminComponent implements OnInit {

  prodottiAcquistati!: UtenteProdotto[];
  usernameUtente!: any;
  items!: MenuItem[];
  listaRichieste: RichiestaCorriere[] = []

constructor(private utenteProdottoService: UtenteProdottoService,private route: ActivatedRoute,private router:Router,private richiestaCorriereService:RichiestaCorriereService) { }

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
            icon:'pi pi-fw pi-user',
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
      this.usernameUtente = params.get('adminProdottiAcqUtente');
      this.utenteProdottoService.getProdottiAcquistati(this.usernameUtente).subscribe(prodotti => {
        this.prodottiAcquistati = prodotti;
      });
    });

    this.richiestaCorriereService.getRichiesteCorriere().subscribe(response=>{this.listaRichieste=response});
  }
}
