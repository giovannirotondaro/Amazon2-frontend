import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';
import { RichiestaCorriere } from '../domain/RichiestaCorriere';
import { RichiestaCorriereService } from '../services/richiesta-corriere.service';

@Component({
  selector: 'app-gestione-admin',
  templateUrl: './gestione-admin.component.html',
  styleUrls: ['./gestione-admin.component.css']
})
export class GestioneAdminComponent implements OnInit {

  constructor(private router:Router, private richiestaCorriereService: RichiestaCorriereService) { }
  listaRichieste: RichiestaCorriere[] = [];
  items!: MenuItem[];
  boxes: Array<number> = new Array(24);

    ngOnInit() {
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
                    },
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
        this.richiestaCorriereService.getRichiesteCorriere().subscribe(response=>this.listaRichieste=response);
    }
}
