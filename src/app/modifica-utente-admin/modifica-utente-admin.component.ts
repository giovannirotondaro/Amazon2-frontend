import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { User } from '../domain/User';
import { UtenteService } from '../services/utente.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-modifica-utente-admin',
  templateUrl: './modifica-utente-admin.component.html',
  styleUrls: ['./modifica-utente-admin.component.css']
})
export class ModificaUtenteAdminComponent implements OnInit {

  stateOptions!: any[];
  utente!:User
  idModificare!:any
  displayDialog:boolean=false
  items!: MenuItem[];

  constructor(private utenteService: UtenteService,private route: ActivatedRoute, private router:Router) {

    this.route.queryParamMap.subscribe(params => {
        this.idModificare = params.get('result');
        this.route.params.subscribe( params => {
            this.utenteService.getUser(this.idModificare).subscribe(
              response => {
                this.utente=response;
              }
            );
          });
      });

    this.utente=new User()
    this.stateOptions = [{label: 'F', value: 'F'}, {label: 'M', value: 'M'}];
   }

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
        }
    ];
  }

  modificaUtente(){
    this.utenteService.modificaDatiPersonali(this.utente).subscribe(
      response=>{
        this.displayDialog=true

      }
    ); 
  }

  eliminaFoto(){
    this.utente.immagineProfilo="https://firebasestorage.googleapis.com/v0/b/techzone-74633.appspot.com/o/fotoProfilo%2Fimg.png?alt=media&token=35a701a1-d2e9-4819-9660-6b24402836ea";
    this.utenteService.modificaDatiPersonali(this.utente).subscribe(
      response=>{
        this.displayDialog=true
      }
    ); 
  }

  chiudi(){
    this.displayDialog=false;
    this.router.navigate(['\modificaUtenteAdmin'])
  }
}
