import { Component, OnInit } from '@angular/core';
import { Prodotto } from '../domain/Prodotto';
import { ActivatedRoute,Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from "rxjs/operators";
import {ProdottoService} from '../services/prodotto.service';

interface Sconto {
  nomeSconto: string,
  scontoNumber: number
}

@Component({
  selector: 'app-modifica-prodotto',
  templateUrl: './modifica-prodotto.component.html',
  styleUrls: ['./modifica-prodotto.component.css']
})
export class ModificaProdottoComponent implements OnInit {
  prodotto!:Prodotto
  categorie:string[]=["Computer","Smartphone","Tablet","Accessori"]
  sconti: Sconto[]=[];
  selectedSconto!: Sconto;
  selectedCategoria!: string;
  displayChargeDialog: boolean = false;
  autoResize:boolean=true
  autoResize1:boolean=true  
  apriModaleErroreCampi: boolean = false;
  apriModaleErroreFoto:boolean=false;
  imgSrc1: string='/assets/img.png';
  imgSrc2: string='/assets/img.png';
  imgSrc3: string='/assets/img.png';
  imgSrc4: string='/assets/img.png';
  selectedImage: any = null;
  selectedImage1: any = null;
  selectedImage2: any = null;
  selectedImage3: any = null;
  selectedImage4: any = null;
  fotoCambiata1:string=""
  fotoCambiata2:string=""
  fotoCambiata3:string=""
  fotoCambiata4:string=""
  altezza!:string;
  larghezza!:string;
  dimensioniTotali!:string
  caricaFoto:boolean=true
  altreInfo:boolean=true
  datiGenerali:boolean=true

  formTemplate = new FormGroup({
    caption: new FormControl('', Validators.required),
    category: new FormControl(''),
    imageUrl: new FormControl('', Validators.required)
  })


  ngOnInit() {
    this.route.params.subscribe( params => {
    this.prodottoService.getProdotto(params['id']).subscribe(
      response => {
          this.prodotto=response;
          var str = this.prodotto.dimensioni;
          var splitted = str.split("x", 2); 
          
          this.altezza = splitted[0]
          this.larghezza= splitted[1]
          this.imgSrc1= this.prodotto.url1;
          this.imgSrc2= this.prodotto.url2;
          this.imgSrc3= this.prodotto.url3;
          this.imgSrc4= this.prodotto.url4;
      });
    });

  }


  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private storage: AngularFireStorage, 
    private prodottoService: ProdottoService,
  ) { 
    this.prodotto=new Prodotto();
    this.sconti = [
      {nomeSconto: '0%', scontoNumber: 0},
      {nomeSconto: '5%', scontoNumber: 5},
      {nomeSconto: '10%', scontoNumber: 10},
      {nomeSconto: '15%', scontoNumber: 15},
      {nomeSconto: '20%', scontoNumber: 20},
      {nomeSconto: '25%', scontoNumber: 25},
      {nomeSconto: '30%', scontoNumber: 30},
      {nomeSconto: '35%', scontoNumber: 35},
      {nomeSconto: '40%', scontoNumber: 40},
      {nomeSconto: '50%', scontoNumber: 50},
     ];  
  }

  showPreview1(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc1 = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage1 = event.target.files[0];
      this.modifica(1);
    }
    else {
      this.imgSrc1 = '/assets/img.png';
      this.selectedImage1 = null;
    }
  }

  showPreview2(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc2 = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage2 = event.target.files[0];
      this.modifica(2);
    }
    else {
      this.imgSrc2 = '/assets/img.png';
      this.selectedImage2 = null;
    }
  }

  showPreview3(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc3 = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage3 = event.target.files[0];
      this.modifica(3);
    }
    else {
      this.imgSrc3 = '/assets/img.png';
      this.selectedImage3 = null;
    }
  }

  showPreview4(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc4 = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage4 = event.target.files[0];
      this.modifica(4);
    }
    else {
      this.imgSrc4 = '/assets/img.png';
      this.selectedImage4 = null;
    }
  }

  modifica(numero: number){
      this.displayChargeDialog = true;
      if(this.selectedImage1!=null || this.selectedImage2 || this.selectedImage3 ||this.selectedImage4){

        var filePath="";
        if(numero==1){
          filePath = `fotoProfilo/${this.selectedImage1.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
          this.selectedImage=this.selectedImage1;
        }
        else if(numero==2){
          filePath = `fotoProfilo/${this.selectedImage2.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
          this.selectedImage=this.selectedImage2;
        }
        else if(numero==3){
          filePath = `fotoProfilo/${this.selectedImage3.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
          this.selectedImage=this.selectedImage3;
        }
        else if(numero==4){
          filePath = `fotoProfilo/${this.selectedImage4.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
          this.selectedImage=this.selectedImage4;
        }

        if((this.selectedImage1!=null && numero==1) || (this.selectedImage2!=null && numero==2) 
            || (this.selectedImage3!=null && numero==3) || (this.selectedImage4!=null && numero==4)) {
          const fileRef = this.storage.ref(filePath);
          this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe((url) => {
                if(numero===1){
                  this.fotoCambiata1=url
                }
                else if(numero===2){
                  this.fotoCambiata2=url
                }
                else if(numero===3){
                  this.fotoCambiata3=url
                }
                else if(numero===4){
                  this.fotoCambiata4=url
                }
              })
            })
          ).subscribe(res=>{this.displayChargeDialog = false});
          }
        }
    }
  
  onSubmitImage() {
    this.dimensioniTotali=this.larghezza+"x"+this.altezza;
    this.prodotto.dimensioni=this.dimensioniTotali;
    
    if(this.fotoCambiata1!==""){
      this.prodotto.url1=this.fotoCambiata1;
    }
    else if(this.fotoCambiata2!==""){
      this.prodotto.url2=this.fotoCambiata2;
    }
    else if(this.fotoCambiata3!==""){
      this.prodotto.url3=this.fotoCambiata3;
    }
    else if(this.fotoCambiata4!==""){
      this.prodotto.url4=this.fotoCambiata4;
    }
    
    if(this.prodotto.quantita>0){
      this.prodotto.disponibile=true;
    }
    else{
      this.prodotto.disponibile=false;
    }
    this.prodottoService.modificaProdotto(this.prodotto).subscribe(result => this.gotoUserList());
  }

  get formControls() {
    return this.formTemplate['controls'];
  }

delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

onSubmit() { }

gotoUserList() { 
  this.router.navigateByUrl('');
}

index: number = 0;

  openNext() {
      this.index = (this.index === 2) ? 0 : this.index + 1;
      if(this.index==1){
      if(this.prodotto.titolo===undefined || this.prodotto.titolo==="" ||
        this.prodotto.categoria===undefined || this.prodotto.categoria==="" ||
        this.prodotto.colore===undefined || this.prodotto.colore==="" ||
        this.prodotto.prezzo===undefined || 
        this.prodotto.quantita===undefined || 
        this.prodotto.anteprima===undefined || this.prodotto.anteprima==="" ||
        this.prodotto.descrizione===undefined || this.prodotto.descrizione===""){
          this.apriModaleErroreCampi = true;
          this.index=0;
          }
      }
      else if(this.index==2){}
  }

  openPrev() {
      this.index = (this.index === 0) ? 2 : this.index - 1;
  }

  chiudiModaleErroreCampi(){
    this.apriModaleErroreCampi = false;
  }

  chiudiModaleErroreFoto(){
    this.apriModaleErroreFoto=false;
  }
  
}