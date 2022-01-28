import { Component, OnInit } from '@angular/core';
import { User } from '../domain/User';
import { ActivatedRoute,Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from "rxjs/operators";
import { ImageService } from './ImageService';
import { Indirizzo } from '../domain/Indirizzo';
import { Carrello } from '../domain/Carrello';
import { CarrelloService } from '../services/carrello.service';
import { IndirizzoService } from '../services/indirizzo.service';
import { UtenteService } from '../services/utente.service';


@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrls: ['./registrazione.component.css']
})
export class RegistrazioneComponent implements OnInit {

  booleanaDati:boolean=true
  booleanaImmagine:boolean=true
  booleanaTermini:boolean=true
  checked:boolean=false
  user:User;
  passwordRipetuta:any
  stateOptions: any[];
  imgSrc: string='/assets/img.png';
  selectedImage: any = null;
  urlAppoggioImmagine!:string
  indirizzoAppoggio!:Indirizzo
  telefonoAppoggio!:any
  apriModaleErroreCampi: boolean = false;
  apriModaleErroreFoto:boolean=false;
  indirizzo!:Indirizzo
  carrello!:Carrello
  userAppoggio!:User
  displayChargeDialog: boolean = false;
  apriModaleErroreCampiPassword:boolean = false;

  userAppoggioControllaEmail!:User
  userAppoggioControllaUsername!:User

  apriModaleErroreUsernameGiaPresente:boolean=false
  apriModaleErroreEmailGiaPresente:boolean=false
  
  formTemplate = new FormGroup({
    caption: new FormControl('', Validators.required),
    category: new FormControl(''),
    imageUrl: new FormControl('', Validators.required)
  })
  
  ngOnInit() {}

constructor(
   private route: ActivatedRoute,
    private router: Router, 
    private storage: AngularFireStorage, 
    private service: ImageService,
    private carrelloService:CarrelloService,
    private indirizzoService:IndirizzoService,
    private utenteService:UtenteService
    ) {
       this.user = new User();
       this.indirizzoAppoggio=new Indirizzo();
       this.stateOptions = [{label: 'F', value: 'F'}, {label: 'M', value: 'M'}];
       this.indirizzo=new Indirizzo()
       this.carrello=new Carrello()
       this.userAppoggio=new User()
       this.userAppoggioControllaEmail=new User()
       this.userAppoggioControllaUsername=new User()
      } 
    
      showPreview(event: any) {
        if (event.target.files && event.target.files[0]) {
          const reader = new FileReader();
          reader.onload = (e: any) => this.imgSrc = e.target.result;
          reader.readAsDataURL(event.target.files[0]);
          this.selectedImage = event.target.files[0];
        }
        else {
          this.imgSrc = '/assets/img.png';
          this.selectedImage = null;
        }
      }
    
      get formControls() {
        return this.formTemplate['controls'];
      }

    delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

  onSubmit() { 
    this.utenteService.getUserByEmail(this.user.email).subscribe(
      responseEmail=>{
        this.userAppoggioControllaEmail=responseEmail
        this.utenteService.getUserByUsername(this.user.username).subscribe(
          responseUsername=>{
            this.userAppoggioControllaUsername=responseUsername;
            if(this.userAppoggioControllaEmail==null && this.userAppoggioControllaUsername==null){
              var filePath = `fotoProfilo/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
              this.displayChargeDialog = true;
              const fileRef = this.storage.ref(filePath);
              this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
                finalize(() => {
                  fileRef.getDownloadURL().subscribe((url) => {
                    this.urlAppoggioImmagine=url;
                    if(this.urlAppoggioImmagine != undefined){
                      
                      this.user.telefono=this.telefonoAppoggio
                      
                      this.user.immagineProfilo=this.urlAppoggioImmagine
                      
                      this.utenteService.registraUtente(this.user).subscribe(
                        result => {
                          this.gotoUserList()
                          this.utenteService.getUserByUsername(this.user.username).subscribe(
                            responseUser=>{
                              this.userAppoggio=responseUser
                              this.carrelloService.addCarrello(this.userAppoggio).subscribe(  
                                response1=>{
                                    this.carrello=response1
                                    
                                    this.carrelloService.updateCarrello(this.userAppoggio,this.carrello.id).subscribe(
                                      response2=>{
                                        this.indirizzoService.addIndForReg(this.userAppoggio).subscribe(
                                          response3=>{
                                            this.indirizzo = response3;
                                            this.indirizzoService.putIndForReg(this.userAppoggio, this.indirizzo.id).subscribe(
                                              responseFinal => { 
                                                this.displayChargeDialog = false;
                                              }
                                            )
                                          }
                                        );
                                      }
                                    );
                                  }
                                );
                            }
                          );
                        }
                      );
                      this.router.navigate(['/']);
                    }
                  })
                })
              ).subscribe();
            }
            else if(this.userAppoggioControllaEmail!==null){
              this.apriModaleErroreEmailGiaPresente=true;
            }
            else if(this.userAppoggioControllaUsername!==null){
              this.apriModaleErroreUsernameGiaPresente=true;
            }
          }
        )
      }
    )
    
    }

  gotoUserList() { 
    this.user.nome="";
    this.router.navigateByUrl('');
  }

  index: number = 0;

  openNext() {
      this.index = (this.index === 2) ? 0 : this.index + 1;
      
      if(this.index==1){
        if(this.user.password!==this.passwordRipetuta){
          this.apriModaleErroreCampiPassword=true;
          this.index=0;
        }
        else if(this.user.nome===undefined || this.user.nome==="" ||
          this.user.cognome===undefined || this.user.cognome==="" ||
          this.user.dataNascita===undefined ||
          this.user.email===undefined || this.user.email==="" ||
          this.user.username===undefined || this.user.username==="" ||
          this.telefonoAppoggio===undefined || this.telefonoAppoggio==="" ||
          this.user.password===undefined || this.user.password==="" ||
          this.passwordRipetuta===undefined || this.passwordRipetuta==="" ||
          this.user.genere===undefined){
            this.index=0;
            this.apriModaleErroreCampi = true;
          }
      }
      else if(this.index==2){
        if(this.selectedImage===null){
          this.index=1;
          this.apriModaleErroreFoto = true;
        }
      }
  }

  openPrev() {
      this.index = (this.index === 0) ? 2 : this.index - 1;
  }

  chiudiModaleErroreCampi(){
    this.apriModaleErroreCampi = false;
  }

  chiudiModaleErroreCampiPassword(){
    this.apriModaleErroreCampiPassword = false;
  }

  chiudiModaleErroreFoto(){
    this.apriModaleErroreFoto=false;
  }

  chiudiModaleErroreEmailGiaPresente(){
    this.apriModaleErroreEmailGiaPresente=false
  }

  chiudiModaleErroreUsernameGiaPresente(){
    this.apriModaleErroreUsernameGiaPresente=false
  }
}
