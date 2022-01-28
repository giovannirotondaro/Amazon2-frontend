import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdottoService } from '../services/prodotto.service';
import { ResoService } from '../services/reso.service';
import { Prodotto } from '../domain/Prodotto';
import { User } from '../domain/User';
import { UtenteProdotto } from '../domain/UtenteProdotto';
import { Reso } from '../domain/Reso';
import { UtenteProdottoService } from '../services/utente-prodotto.service';


declare var require: any
const FileSaver = require('file-saver');

@Component({
  selector: 'app-reso',
  templateUrl: './reso.component.html',
  styleUrls: ['./reso.component.css']
})
export class ResoComponent implements OnInit {

  prodotto!:Prodotto
  utente!:User
  prodottoAcquistato!: UtenteProdotto;
  resoDaAggiungere!:Reso;
  resi:Reso[]=[]
  isPresenteReso=false; 
  apriModaleResoEffettuatoBoolean!:boolean
  apriModaleResoGiaPresenteBoolean!:boolean

  constructor(
    private prodottoService:ProdottoService,
    private route: ActivatedRoute,
    private router: Router, 
    private resoService:ResoService,
    private utenteProdottoService:UtenteProdottoService,
    ) { 
      this.resoDaAggiungere=new Reso();
      this.prodotto= new Prodotto();
      this.prodottoAcquistato = new UtenteProdotto();
    }

  indexMotivo=0
  selectedCategory: any = null;
  categoria!:string;

  categories: any[] = [{name: 'Ho riconsiderato il mio acquisto.', key: 'A'}, 
  {name: 'L\'articolo acquistato è stato consegnato danneggiato o difettoso', key: 'B'}, 
  {name: 'Articolo mancante', key: 'C'}, 
  {name: 'Altro', key: 'D'}];
  
  motivo!: String

  ngOnInit() {
    this.selectedCategory = this.categories[this.indexMotivo];
    this.route.params.subscribe( params => {
      this.utenteProdottoService.getProdottoAcquistato(params['id']).subscribe(response => {
        this.prodottoAcquistato=response; 
          this.prodottoService.getProdottoNotPath(this.prodottoAcquistato.prodotto.id).subscribe(
            response1=>{
              this.prodotto=response1;
              this.resoService.getResiByVenditore(this.prodotto.vendutoDa.username).subscribe(    
                response2 => {        
                 this.resi=response2;
                });
            })
      });
     }); 
  }

  index: number = 0;

  openNext() {
      this.index = (this.index === 2) ? 0 : this.index + 1;
      if(this.index==1){}
      else if(this.index==2){}
  }

  openPrev() {
    this.index = (this.index === 0) ? 2 : this.index - 1;
}

downloadPdf() {
  const pdfUrl = './assets/ModuloReso.pdf';
  const pdfName = 'ModuloReso';
  FileSaver.saveAs(pdfUrl, pdfName);
}

  ResoSubmit(){
    this.categoria=  this.selectedCategory.name;
    this.resoDaAggiungere.idProdotto=this.prodotto.id;
    this.resoDaAggiungere.motivoReso=this.categoria;
    this.resoDaAggiungere.numeroOrdine=this.prodottoAcquistato;
    this.resoDaAggiungere.quantita=this.prodottoAcquistato.quantita;
    this.resoDaAggiungere.usernameMittente=this.prodottoAcquistato.user.username;
    this.resoDaAggiungere.usernameDestinatario=this.prodotto.vendutoDa.username;
    this.resoDaAggiungere.prezzo=this.prodotto.prezzo - this.prodotto.prezzo*(this.prodotto.sconto/100);
    this.resoDaAggiungere.rimborsato=false;
    
    this.resoPresente(this.resoDaAggiungere);

  }

  resoPresente(reso:Reso){
    for (let i = 0; i < this.resi.length; i++) {
      if(this.resi[i].numeroOrdine.id == reso.numeroOrdine.id){
        this.isPresenteReso=true;
        this.ngOnInit()
        this.apriModaleResoGiaPresente()
      }
    }
      if(this.isPresenteReso==false && reso.numeroOrdine.stato == "CONSEGNATO"){
        this.resoService.aggiungiReso(reso).subscribe(result=>this.ngOnInit());
        this.apriModaleResoEffettuato()
        this.isPresenteReso=true;
      }
  }

  apriModaleResoEffettuato(){
    this.apriModaleResoEffettuatoBoolean=true;
    
  }
  chiudiModaleResoEffettuato(){
    this.apriModaleResoEffettuatoBoolean=false;
    this.router.navigate(['/cronologia']);
  }

  apriModaleResoGiaPresente(){
    this.apriModaleResoGiaPresenteBoolean=true;
    
  }
  chiudiModaleResoGiaPresente(){
    this.apriModaleResoGiaPresenteBoolean=false;
    this.router.navigate(['/cronologia']);
  }
}