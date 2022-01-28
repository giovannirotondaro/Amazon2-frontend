import { Component, OnInit } from '@angular/core';
import { ProdottoService } from '../services/prodotto.service';
import { UtenteProdotto } from '../domain/UtenteProdotto';
import { UtenteProdottoService } from '../services/utente-prodotto.service';
import {MenuItem} from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-area-corriere',
  templateUrl: './area-corriere.component.html',
  styleUrls: ['./area-corriere.component.css']
})
export class AreaCorriereComponent implements OnInit {

  spedizioniAcquisite!: UtenteProdotto[];  
  user: any = sessionStorage.getItem("userCorriere");
  stateOptions!: any[];
  items!: MenuItem[];

  constructor(private prodottoService: ProdottoService, private utenteProdottoService: UtenteProdottoService,private router: Router) {
    this.stateOptions = [{label: 'In consegna', value: 'inConsegna'}, {label: 'Consegnato', value: 'consegnato'}];
   }

  ngOnInit(): void {

    this.items = [
      {
          label:'Gestione Corrieri',
          icon:'pi pi-fw pi pi-box',
          items:[
              {
                  label:'Acquisisci Spedizioni',
                  command:(event)=>{
                    this.router.navigate(['/gestioneCorrieri']);
                  },
                  icon:'pi pi-check',
              },
              {
                  label:'Area Personale Corriere',
                  command:(event)=>{
                    this.router.navigate(['/areaCorriere']);
                  },
                  icon:'pi pi-globe',
              }
          ]
      },
  ];

    
    this.utenteProdottoService.getProdottiAcquisitiDaUnDeterminatoCorriere(this.user).subscribe(prodotti => {
      this.spedizioniAcquisite = prodotti;
      this.spedizioniAcquisite.sort((x,y)=>{
        if(x.stato === 'PRESO_IN_CARICO' && y.stato==='CONSEGNATO'){
          return -1;
        }

        if(x.stato === 'IN_CONSEGNA' && y.stato==='PRESO_IN_CARICO'){
          return -1;
        }

        if(x.stato === 'IN_CONSEGNA' && y.stato==='CONSEGNATO'){
          return -1;
        }
        
        return 0;
      });
    });
  }

  aggiornaSpedizioni(utenteProd: UtenteProdotto){
    if (utenteProd.stato === 'IN_CONSEGNA')
      utenteProd.stato = "CONSEGNATO";
    if (utenteProd.stato === 'PRESO_IN_CARICO')
      utenteProd.stato = "IN_CONSEGNA";
    
    this.utenteProdottoService.aggiornaStatoSpedizione(utenteProd).subscribe(
      response=>{
        this.ngOnInit()
      });
  }
}
