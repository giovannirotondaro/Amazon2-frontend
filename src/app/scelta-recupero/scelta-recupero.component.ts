import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtenteService } from '../services/utente.service';

@Component({
  selector: 'app-scelta-recupero',
  templateUrl: './scelta-recupero.component.html',
  styleUrls: ['./scelta-recupero.component.css']
})
export class SceltaRecuperoComponent implements OnInit {

  codiceAttuale!:any
  counter!:number
  value!:number
  s:string="s"
  codiceInserito!:any
  email!:any
  disabilitaBottone!:boolean
  scelta!: string;
  username!:string
  recuperoAvvenuto:string="";
  apriModaleRecuperoAvvenuto:boolean=false;


  constructor(private router:Router,private route: ActivatedRoute,private utenteService:UtenteService) {}

  ngOnInit(): void {

    this.route.queryParamMap.subscribe(params => {
      
      this.codiceInserito = params.get('result1');
      this.codiceAttuale = params.get('result2');
      this.email = params.get('result3');
      if(this.email!==null && this.codiceAttuale===this.codiceInserito){
        this.disabilitaBottone=false
      }
      else{
        this.disabilitaBottone=true
      }
    });
    this.counter=100;
    this.value=100
  }

  recupera(){
    let ricordaEmail=this.email
      if(this.scelta==="username"){
        this.utenteService.recuperaUsername(ricordaEmail).subscribe(
          response=>{
            this.recuperoAvvenuto="Il tuo username è stato recuperato. Controlla la tua email!"
            this.apriModaleRecuperoAvvenuto=true;
          }
        );
      }
      else if(this.scelta==="password"){
        this.utenteService.recuperaPassword(ricordaEmail).subscribe(
          response=>{
            this.recuperoAvvenuto="La tua password è stata recuperata. Controlla la tua email!"
            this.apriModaleRecuperoAvvenuto=true;
          }
        );
      }
  }

  esci(){
    this.apriModaleRecuperoAvvenuto=false;
    this.router.navigate(['']);
  }
}
