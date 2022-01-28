import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '../domain/User';
import { UtenteService } from '../services/utente.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from "rxjs/operators";
import { ImageService } from '../registrazione/ImageService';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CartaCredito } from '../domain/CartaCredito';
import { CartaCreditoService } from '../services/carta-credito.service';

interface Ricarica {
  name: string,
  code: number
}

@Component({
  selector: 'app-informazioni-personali',
  templateUrl: './informazioni-personali.component.html',
  styleUrls: ['./informazioni-personali.component.css'],
  providers: [DatePipe]
})
export class InformazioniPersonaliComponent implements OnInit {

  passwordAttuale: string = "";
  nuovaPassword: string = "";
  confermaNuovaPassword: string = "";
  apriModaleModificaPassword: boolean = false;
  selezionaRicarica!: Ricarica;
  utente!: User;
  username: any;
  imgSrc: string='';
  selectedImage: any = null;
  urlAppoggioImmagine!:string
  saldoUtente!:any

  apriModaleEliminaBooleana!: boolean;
  cambiaFotoBool:boolean=false

  carte: CartaCredito[] = [];
  cartaSelezionata: any = null;

  displayModalCarta!:boolean;
  displayModalRicarica!:boolean;

  importoRicarica: number = 0;

  mesi: string[] = ["01", "02", "03", "04", "05", "06", "07", "08","09", "10", "11", "12",]
  anni: string[] = [];
  tipiCarta: string[] = ["Mastercard", "Maestro", "American Express", "Visa"]

  meseSelezionato!: string;
  annoSelezionato!: string;
  tipoSelezionato!: string;
  numeroCartaSelezionato: string = "";
  cvvSelezionato: string = "";
  titolareSelezionato: string = "";

  displayDialog: boolean = false;
  avviso!: string;

  constructor(private utenteService: UtenteService,private datePipe: DatePipe,private storage: AngularFireStorage, 
    private service: ImageService, private authService: AuthService, private route:Router, private cartaCreditoService: CartaCreditoService) {
    this.utente=new User();
  }

  ngOnInit(): void {
    for(let i=2022; i<=2050; i++){
      this.anni.push(i.toString());
    }

    this.cambiaFotoBool=false;
    this.username = sessionStorage.getItem("user")
    this.utenteService.getUserByUsername(this.username).subscribe(
      response=>{
        this.utente = response;
        
        this.imgSrc=this.utente.immagineProfilo;
        this.saldoUtente= this.utente.saldo.toFixed(2);
        this.cartaCreditoService.getCarteByUsername(this.username).subscribe(
          response1 => {
            this.carte = response1;
            if(response1.length !== 0){
              this.cartaSelezionata = this.carte[0];
            }
          }
        )
      });
  }

  modificaUtente(){
    this.utenteService.modificaDatiPersonali(this.utente).subscribe();
  }
  
  cambiaFoto(){
    this.cambiaFotoBool=true;
  }

  
  effettuaRicarica(){

    this.displayModalRicarica = false;

    if(this.importoRicarica == 0 || this.importoRicarica > 1000){
      this.avviso = "Importo nullo o superiore al limite";
      this.displayDialog = true;
    }

    this.utente.saldo = +this.utente.saldo + +this.importoRicarica;
    this.utenteService.modificaDatiPersonali(this.utente).subscribe(response => {this.ngOnInit();});
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else {
      this.selectedImage = null;
    }
  }

  onSubmitImage() {
      if(this.cambiaFotoBool){
        var filePath = `fotoProfilo/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
        
        const fileRef = this.storage.ref(filePath);
        this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.urlAppoggioImmagine=url;
              
              this.utente.immagineProfilo=url;
              this.utenteService.modificaDatiPersonali(this.utente).subscribe();
            })
          })
        ).subscribe();
      }
      else{
        
        this.utenteService.modificaDatiPersonali(this.utente).subscribe();
      }
  }

  showModalCartaDialog() {
    this.displayModalCarta = true;
  }

  showModalRicaricaDialog() {
    if(this.carte.length == 0){
      this.avviso = "Aggiungi una carta per effettuare una ricarica";
      this.displayDialog = true;
    }
    else{
      this.displayModalRicarica = true;
    }
  }

  apriModaleElimina(){
    this.apriModaleEliminaBooleana = true;
  }

  chiudiModaleEliminaSi(){
    
    this.authService.clearAll();

    this.utenteService.eliminaUtente(this.utente).subscribe();
    this.apriModaleEliminaBooleana=false;
    this.route.navigate([''])
  }

  chiudiModaleEliminaNo(){
    this.apriModaleEliminaBooleana=false;
  }

  scegliCarta(){}

  aggiungiCarta(){
    if(this.numeroCartaSelezionato.length !== 16){
      this.avviso = "Numero di carta non valido";
      this.displayDialog = true;
      return;
    }

    if(this.cvvSelezionato.length !== 3){
      this.avviso = "CVV non valido";
      this.displayDialog = true;
      return;
    }

    if(this.numeroCartaSelezionato !== "" && this.titolareSelezionato !== "" && this.cvvSelezionato !== ""  && this.tipoSelezionato !== "" && this.meseSelezionato !== "" && this.annoSelezionato !== ""){
      let carta: CartaCredito = new CartaCredito();
      carta.titolare = this.titolareSelezionato;
      carta.numeroCarta = this.numeroCartaSelezionato;
      carta.tipologia = this.tipoSelezionato;
      carta.meseScadenza = this.meseSelezionato;
      carta.annoScadenza = this.annoSelezionato;
      carta.cvv = this.cvvSelezionato;
      this.cartaCreditoService.addCarta(carta, this.utente.username).subscribe(
        response => {
          if(response === "Carta aggiunta"){
            this.ngOnInit();
            this.displayModalCarta = false;
          }
          this.avviso = response;
          this.displayDialog = true;
        }
      )
    }   
    else{
      this.avviso = "Inserire tutti i parametri";
      this.displayDialog = true;
    } 
  }

  cancellaCarta(id: number){
    this.cartaCreditoService.deleteCarta(id, this.utente.id).subscribe(
      response => {
        this.ngOnInit();
      }
    );
  }

  
  modificaPassword(){
    if(this.nuovaPassword === this.confermaNuovaPassword){
      this.utenteService.updatePassword(this.utente, this.passwordAttuale,this.nuovaPassword).subscribe(
        result => {
          this.avviso = result;
          this.displayDialog = true;
          if(result === "Password modificata con successo"){
            this.apriModaleModificaPassword = false;
            this.ngOnInit();
          }
        }
      );
    }
    else{
      this.avviso = "La nuova password non corrisponde a quella confermata";
      this.displayDialog = true;
    }
  }
}