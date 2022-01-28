import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';
import { Corriere } from '../domain/Corriere';
import { RichiestaCorriere } from '../domain/RichiestaCorriere';
import { CorriereService } from '../services/corriere.service';
import { RichiestaCorriereService } from '../services/richiesta-corriere.service';

@Component({
  selector: 'app-richieste-corrieri',
  templateUrl: './richieste-corrieri.component.html',
  styleUrls: ['./richieste-corrieri.component.css']
})
export class RichiesteCorrieriComponent implements OnInit { 
  listaRichieste: RichiestaCorriere[] = [];
  corriere!:Corriere
  usernamePerCorriere!:string
  apriModaleColloquio:boolean=false
  dataColloquio!:Date
  oraColloquio!:Time

  constructor(private richiestaCorriereService: RichiestaCorriereService, private router: Router,
    private corriereService:CorriereService,) { }

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
        this.richiestaCorriereService.getRichiesteCorriere().subscribe(
          response=>{this.listaRichieste=response;
          }
        );
    }

    showBasicDialog() {
        this.displayBasic = true;
    }

    inviaAppuntamento(richiesta:RichiestaCorriere){
      this.apriModaleColloquio=false
      richiesta.dataColloquio=this.dataColloquio
      richiesta.oraColloquio=this.oraColloquio
      richiesta.hannoColloquio=true

      this.richiestaCorriereService.updateColloquio(richiesta).subscribe(
        response=>{
        }
      )
    }

    rifiutaRichiesta(richiesta:RichiestaCorriere){
      this.richiestaCorriereService.rimuoviRichiestaCorriere(richiesta.id).subscribe(
        response1=>{
          window.location.reload()
          
        }
      )}

    prenotaColloquio(richiesta:RichiestaCorriere){
      this.apriModaleColloquio=true
    }

    aggiungiCorriere(richiesta:RichiestaCorriere){
      let caratteriPerPassword: string[] = [')','(','=','?','!','=','_','-',
                                            '1','2','3','4','5','6','7','8','9',
                                            'A','B','C','D','E','F','G','H','I','L','M',
                                            'N','O','P','Q','R','S','T','U','Z','a','b',
                                            'c','d','e','f','g','h','i','l','m','n','o',
                                            'p','q','r','s','t','u','v','z','y','j','Y','J'];
      let passwordPerCorriere:string=""
      for(let i=0;i<10;i++){
        passwordPerCorriere+=caratteriPerPassword[Math.floor(Math.random() * (caratteriPerPassword.length + 1))];
      }

      let listaCorrieri:Corriere[]=[]
      
      this.corriereService.getAllCorrieri().subscribe(
        response=>{
          listaCorrieri=response;

          
          let esisteGiaUnUsernameInQuestoModo=true
          
          while(esisteGiaUnUsernameInQuestoModo){
            esisteGiaUnUsernameInQuestoModo=false
            let numero=Math.floor(Math.random() * (9999))
            this.usernamePerCorriere="corriere_"+numero
            for(let j=0;j<listaCorrieri.length;j++){
              if(listaCorrieri[j].username===this.usernamePerCorriere){
                esisteGiaUnUsernameInQuestoModo=true
              }
            }
          }
          this.corriere.nome=richiesta.nome;
          this.corriere.cognome=richiesta.cognome;
          this.corriere.email=richiesta.email;
          this.corriere.telefono=richiesta.telefono;
          this.corriere.dataNascita=richiesta.dataNascita;
          this.corriere.genere=richiesta.genere;
          this.corriere.password=passwordPerCorriere;
          this.corriere.username=this.usernamePerCorriere;
          this.corriereService.aggiungiCorriere(this.corriere).subscribe(
            response=>{
              this.richiestaCorriereService.rimuoviRichiestaCorriereSenzaEmail(richiesta.id).subscribe(
                response1=>{
                  window.location.reload()
                }
              )
            }
          );
        }
      )
    }
}
