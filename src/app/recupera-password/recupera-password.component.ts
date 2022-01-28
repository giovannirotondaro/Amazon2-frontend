import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtenteService } from '../services/utente.service';



@Component({
  selector: 'app-recupera-password',
  templateUrl: './recupera-password.component.html',
  styleUrls: ['./recupera-password.component.css']
})
export class RecuperaPasswordComponent implements OnInit {  
  codiceAttuale!:number
  counter!:number
  value!:number
  s:string="s"
  codiceInserito!:number
  usernameUtente!:any
  apriAvvisoCodiceErrato:boolean=false
  apriAvvisoReinvio:boolean=false
  i=0
  email!:any

  constructor(private router:Router,private route: ActivatedRoute,private utenteService:UtenteService) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.email = params.get('result');
      this.counter=100;
      this.usernameUtente=sessionStorage.getItem('user')
      this.doTimer(this.email)
      this.value=100
    });  
  }

  async doTimer(email:string) {
    this.i=0;
    this.value=100;
    this.utenteService.generaCodice(email).subscribe(
      response=>{
        this.codiceAttuale=response
    });
    for (this.i = 0; this.i < this.counter; this.i++) {
        await delay(1000);
        this.value=this.value-1
        if(this.i==this.counter-1){
          this.utenteService.generaCodice(email).subscribe(
            response=>{
              this.codiceAttuale=response
        
          });
        }
    }
  } 

  controllaCodice(){
    if(this.codiceInserito==this.codiceAttuale){
      this.router.navigate(["/sceltaRecupero"], {queryParams: {result1:this.codiceInserito,result2:this.codiceAttuale,result3:this.email},skipLocationChange: true});
    }
    else{
      this.apriAvvisoCodiceErrato=true
    }
  }

  reinviaCodice(){
    this.apriAvvisoReinvio=true
    if(this.value==0){
      this.doTimer(this.email)
    }
    this.utenteService.generaCodice(this.email).subscribe(
      response=>{
        this.codiceAttuale=response
        this.i=0
        this.value=100
    });
  }

  chiudiModaleErrore(){
    this.apriAvvisoCodiceErrato = false;
  }

  chiudiModaleReinvio(){
    this.apriAvvisoReinvio=false
  }
}

function delay(delay: number) {
  return new Promise(r => {
      setTimeout(r, delay);
  })
}



