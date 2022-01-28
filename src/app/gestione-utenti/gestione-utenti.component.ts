import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';
import { User } from '../domain/User';
import { UtenteService } from '../services/utente.service';
import { RichiestaCorriere} from '../domain/RichiestaCorriere';
import { RichiestaCorriereService } from '../services/richiesta-corriere.service';

@Component({
  selector: 'app-gestione-utenti',
  templateUrl: './gestione-utenti.component.html',
  styleUrls: ['./gestione-utenti.component.css']
})
export class GestioneUtentiComponent implements OnInit {
  listaRichieste: RichiestaCorriere[] = [];
  listaUtenti!:User[]
  bloccato!:boolean
  apriModaleBlocco: boolean = false;
  apriModaleGiaBloccato: boolean=false;
  
  constructor(private richiestaCorriereService: RichiestaCorriereService, private utenteService: UtenteService, private router: Router) { }

  items!: MenuItem[];
  boxes: Array<number> = new Array(24);
  displayBasic!: boolean;


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
        this.utenteService.getUsers().subscribe(utenti=>this.listaUtenti=utenti);
    }

    modificaUtente(id:number){
        this.modifica(id)
    }

    modifica(id:number){
        
        this.router.navigate(["modificaUtenteAdmin"], {queryParams: {result: id}});
      }

    bloccaUtente(id:number){
        
        this.utenteService.bloccaUser(id).subscribe(
            response => {
                this.bloccato=response;
                
                if(!this.bloccato){
                    this.apriModaleBlocco = true;
                }
                else{
                    this.apriModaleGiaBloccato=true;                    
                }
            }
        );
    }

    mostraProdottiAcquistatiUtente(user: User){
        this.router.navigate(["acquistiAdmin"], {queryParams: {adminProdottiAcqUtente: user.username}});
    }

    chiudiModaleBlocco(){
        this.apriModaleBlocco = false;
    }

    chiudiModaleGiaBloccato(){
        this.apriModaleGiaBloccato = false;
    }

    mostraProdottiVendutiUtente(user: User){
        this.router.navigate(["prodottiVendutiAdmin"], {queryParams: {adminProdottiVenUtente: user.username}});
    }
}
