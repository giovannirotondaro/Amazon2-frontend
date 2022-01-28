import { Component, OnInit } from '@angular/core';
import { CorriereService } from '../services/corriere.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { RichiestaCorriere } from '../domain/RichiestaCorriere';
import { RichiestaCorriereService } from '../services/richiesta-corriere.service';
import { observable, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lavora-con-noi',
  templateUrl: './lavora-con-noi.component.html',
  styleUrls: ['./lavora-con-noi.component.css']
})
export class LavoraConNoiComponent implements OnInit {

  booleanaDati:boolean=true
  displayDialog: boolean = false;
  displayChargeDialog: boolean = false;
  avviso!: string;
  richiestaCorriere!:RichiestaCorriere
  stateOptions: any[];
  selectedPdf:any
  urlPdf:any
  imgSrc:string='/assets/curriculum.jpg'
  telefonoAppoggio:any
  
  formTemplate = new FormGroup({
    caption: new FormControl('', Validators.required),
    category: new FormControl(''),
    imageUrl: new FormControl('', Validators.required)
  })
  
ngOnInit() {}

constructor(
    private storage: AngularFireStorage, 
    private richiestaCorriereService:RichiestaCorriereService,private corriereService:CorriereService,private router:Router) {
        this.richiestaCorriere=new RichiestaCorriere()
        this.stateOptions = [{label: 'F', value: 'F'}, {label: 'M', value: 'M'}];
        this.resetForm();
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
    }

    delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    onSubmit() {
      this.richiestaCorriere.telefono=this.telefonoAppoggio;
      let risultato:boolean
      let risultato1:boolean
      this.corriereService.getCorriereByEmail(this.richiestaCorriere.email).subscribe(
        response=>{
          risultato=response
          this.richiestaCorriereService.getRichiestaCorriereByEmail(this.richiestaCorriere.email).subscribe(
            response1=>{
              risultato1=response1
              if(risultato==true || risultato1==true){
                this.avviso="Attenzione, esiste già un corriere o una richiesta lavorativa già registrata/o con questa email!"
                this.displayDialog=true;
              }
              else{
                this.richiestaCorriere.hannoColloquio=false
                this.displayChargeDialog = true;
                var filePath = `pdfCorrieri/${this.selectedPdf.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
        
                const fileRef = this.storage.ref(filePath);
                this.storage.upload(filePath, this.selectedPdf).snapshotChanges().subscribe(
                  response=>{
                    fileRef.getDownloadURL().subscribe((url) => {
                      this.richiestaCorriere.urlPdf=url;
                      this.richiestaCorriereService.aggiungiRichiestaCorriere(this.richiestaCorriere).subscribe(
                        response1 => {
                          this.displayChargeDialog = false;
                          this.avviso = "Richiesta inviata";
                          this.displayDialog = true;
                        }
                      )
                    });
                  });
              }
            }
          )
             
        }
      )
    }

    chiudi(){
      this.router.navigate(['']);
    }

    showPreview(event: any) {
      if (event.target.files && event.target.files[0]) {
        this.selectedPdf = event.target.files[0];
      }
    }

    index: number = 0;
    openNext() {
        this.index = (this.index === 2) ? 0 : this.index + 1;
        if(this.index==1){
          if(this.richiestaCorriere.nome===undefined || this.richiestaCorriere.nome==="" ||
          this.richiestaCorriere.cognome===undefined || this.richiestaCorriere.cognome==="" ||
          this.richiestaCorriere.dataNascita===undefined ||
          this.richiestaCorriere.email===undefined || this.richiestaCorriere.email==="" ||
          this.telefonoAppoggio===undefined || this.telefonoAppoggio==="" ||
          this.richiestaCorriere.genere===undefined){
            this.index=0;
            this.avviso="Attenzione, compilare tutti i campi!"
            this.displayDialog=true;
          }
        }else if(this.index==2){
          if(this.selectedPdf===undefined){
            this.index=1;
            this.avviso="Attenzione, inserire il CV!"
            this.displayDialog=true;
          }
        }
    }

    openPrev() {
      this.index = (this.index === 0) ? 2 : this.index - 1;
    }
}
