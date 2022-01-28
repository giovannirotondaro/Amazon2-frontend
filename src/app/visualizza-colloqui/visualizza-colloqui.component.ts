import { Time } from '@angular/common';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';
import { Corriere } from '../domain/Corriere';
import { RichiestaCorriere } from '../domain/RichiestaCorriere';
import { Component, OnInit } from '@angular/core';
import { RichiestaCorriereService } from '../services/richiesta-corriere.service';

@Component({
  selector: 'app-visualizza-colloqui',
  templateUrl: './visualizza-colloqui.component.html',
  styleUrls: ['./visualizza-colloqui.component.css']
})
export class VisualizzaColloquiComponent implements OnInit {

  listaRichieste: RichiestaCorriere[] = [];
  listaRichiestaNuova: RichiestaCorriere[] = [];
  messaggio:string=""
  bloccato!:boolean
  apriModaleBlocco: boolean = false;
  apriModaleGiaBloccato: boolean=false;
  corriere!:Corriere
  usernamePerCorriere!:string
  dataColloquio!:Date
  oraColloquio!:Time
  apriModaleColloquio:boolean=false

  constructor(private router: Router,private richiestaCorriereService:RichiestaCorriereService) { }

  items!: MenuItem[];
  displayBasic!: boolean;


    ngOnInit() {
        this.corriere=new Corriere()
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
        this.richiestaCorriereService.getRichiesteCorriereAppuntamento().subscribe(response=>this.listaRichieste=response);
        this.richiestaCorriereService.getRichiesteCorriere().subscribe(response=>{this.listaRichiestaNuova=response});
    }

    eliminaAppuntamento(richiesta:RichiestaCorriere){
        this.richiestaCorriereService.eliminaAppuntamentoCorriere(richiesta).subscribe(
          response1=>{
            window.location.reload()        
          }
    );}

    confermaModificaAppuntamento(richiesta:RichiestaCorriere){
      this.apriModaleColloquio=false
      this.richiestaCorriereService.updateColloquioModificaAppuntamento(richiesta).subscribe(
        response=>{
        }
      )
    }

    modificaAppuntamento(richiesta:RichiestaCorriere){
      this.apriModaleColloquio=true
    }
}
