import { Component, OnInit } from '@angular/core';
import { Prodotto } from '../domain/Prodotto';
import { User } from '../domain/User';
import { ActivatedRoute,Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from "rxjs/operators";
import { ImageService } from './ImageService';
import {ProdottoService} from '../services/prodotto.service';
import {NavbarComponent} from '../navbar/navbar.component'

interface Sconto {
  nomeSconto: string,
  scontoNumber: number
}

@Component({
  selector: 'app-vendi-prodotto',
  templateUrl: './vendi-prodotto.component.html',
  styleUrls: ['./vendi-prodotto.component.css']
})
export class VendiProdottoComponent implements OnInit {

  ngOnInit() {}
  
  prodotto!:Prodotto
  categorie:string[]=["Computer","Smartphone","Tablet","Accessori"]
  sconti: Sconto[]=[];

  selectedSconto!: Sconto;
  
  selectedCategoria!: string;

  autoResize:boolean=true
  autoResize1:boolean=true
  urlAppoggioImmagine1:string="pappa1"
  urlAppoggioImmagine2:string="pappa2"
  urlAppoggioImmagine3:string="pappa3"
  urlAppoggioImmagine4:string="pappa4"
  
  nome:any
  date3:any
  checked:boolean=false
  value1:any
  apriModaleErroreCampi: boolean = false;
  apriModaleErroreFoto:boolean=false;

  displayChargeDialog: boolean = false;
  email2:any
  pass2:any
  
  names: string[]=[];
  uploadedFiles: any[] = [];
  selectedValues: string[] = [];

  imgSrc1: string='/assets/img.png';
  imgSrc2: string='/assets/img.png';
  imgSrc3: string='/assets/img.png';
  imgSrc4: string='/assets/img.png';

  selectedImage1: any = null;
  selectedImage2: any = null;
  selectedImage3: any = null;
  selectedImage4: any = null;

  isSubmitted: any;

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

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private storage1: AngularFireStorage,
    private storage2: AngularFireStorage, 
    private storage3: AngularFireStorage,
    private storage4: AngularFireStorage, 
    private prodottoService: ProdottoService,
    private service: ImageService
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
    }
    else {
      this.imgSrc4 = '/assets/img.png';
      this.selectedImage4 = null;
    }
  }

  onSubmitImage(formValue: { [x: string]: any; }) {
    this.displayChargeDialog = true;
    this.isSubmitted = true;
    var filePath1 = `fotoProfilo/${this.selectedImage1.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      
      const fileRef1 = this.storage1.ref(filePath1);
      this.storage1.upload(filePath1, this.selectedImage1).snapshotChanges().pipe(
        finalize(() => {
          fileRef1.getDownloadURL().subscribe((url) => {
            this.urlAppoggioImmagine1=url;
            var filePath2 = `fotoProfilo/${this.selectedImage2.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      
      const fileRef2 = this.storage2.ref(filePath2);
      this.storage2.upload(filePath2, this.selectedImage2).snapshotChanges().pipe(
        finalize(() => {
          fileRef2.getDownloadURL().subscribe((url) => {
            this.urlAppoggioImmagine2=url;
            var filePath3 = `fotoProfilo/${this.selectedImage3.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      
      const fileRef3 = this.storage3.ref(filePath3);
      this.storage3.upload(filePath3, this.selectedImage3).snapshotChanges().pipe(
        finalize(() => {
          fileRef3.getDownloadURL().subscribe((url) => {
            this.urlAppoggioImmagine3=url;
            var filePath4 = `fotoProfilo/${this.selectedImage4.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      
      const fileRef4 = this.storage4.ref(filePath4);
      this.storage4.upload(filePath4, this.selectedImage4).snapshotChanges().pipe(
        finalize(() => {
          fileRef4.getDownloadURL().subscribe((url) => {
            this.urlAppoggioImmagine4=url;
            this.dimensioniTotali=this.larghezza+"x"+this.altezza;
            this.prodotto.dimensioni=this.dimensioniTotali;
            this.prodotto.url1=this.urlAppoggioImmagine1;
            this.prodotto.url2=this.urlAppoggioImmagine2;
            this.prodotto.url3=this.urlAppoggioImmagine3;
            this.prodotto.url4=this.urlAppoggioImmagine4;
            this.prodotto.vendutoDa=new User()
            this.prodotto.vendutoDa.username=NavbarComponent.prova;
            this.prodottoService.inserisciProdotto(this.prodotto).subscribe(result => {this.displayChargeDialog=false; this.gotoUserList()});
          })
        })
      ).subscribe();
          })
        })
      ).subscribe();
          })
        })
      ).subscribe();
          })
        })
      ).subscribe();
  }

  get formControls() {
    return this.formTemplate['controls'];
  }

  resetForm() {
    this.formTemplate.reset();
    this.formTemplate.setValue({
      caption: '',
      imageUrl: '',
      category: 'Animal'
    });
    this.imgSrc1 = '/assets/img.png';
    this.imgSrc2 = '/assets/img.png';
    this.imgSrc3 = '/assets/img.png';
    this.imgSrc4 = '/assets/img.png';
    this.selectedImage1 = null;
    this.selectedImage2 = null;
    this.selectedImage3 = null;
    this.selectedImage4 = null;
    this.isSubmitted = false;
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
      else if(this.index==2){
        if(this.selectedImage1===null || this.selectedImage2===null || this.selectedImage3===null || this.selectedImage4===null){
          this.apriModaleErroreFoto = true;
          this.index=1;
        }
      }
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