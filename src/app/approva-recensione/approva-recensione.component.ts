import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Recensione } from '../domain/Recensione';
import { RichiestaCorriere } from '../domain/RichiestaCorriere';
import { RecensioneService } from '../services/recensione.service';
import { RichiestaCorriereService } from '../services/richiesta-corriere.service';

@Component({
  selector: 'app-approva-recensione',
  templateUrl: './approva-recensione.component.html',
  styleUrls: ['./approva-recensione.component.css']
})
export class ApprovaRecensioneComponent implements OnInit {

  listaRichieste: RichiestaCorriere[] = [];
  listaRecensioniDaApprovare:Recensione[]=[];
  
  constructor(
        private router: Router,
        private recensioneService:RecensioneService,
        private richiestaCorriereService:RichiestaCorriereService,
    ) {}

  items!: MenuItem[];

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

        this.richiestaCorriereService.getRichiesteCorriere().subscribe(response=>this.listaRichieste=response);
        this.recensioneService.getRecensioniNonApprovate().subscribe(
            response=>{
                this.listaRecensioniDaApprovare=response
            }
        )
    }

    modificaUtente(id:number){
        this.modifica(id)
    }

    modifica(id:number){    
        this.router.navigate(["modificaUtenteAdmin"], {queryParams: {result: id}});
    }

    approvaRecensione(recensione:Recensione){
        this.recensioneService.approvaRecensione(recensione).subscribe(
            response=>{
                this.ngOnInit();
        });
    }

    nonApprovaRecensione(recensione:Recensione){
        this.recensioneService.nonApprovaRecensione(recensione).subscribe(
            response=>{
                this.ngOnInit();
        }); 
    }  
}