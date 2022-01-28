import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProdottoService } from '../services/prodotto.service';
import { ProdottoCarrello } from '../domain/ProdottoCarrello';
import { CarrelloService } from '../services/carrello.service';
import { IndirizzoService } from '../services/indirizzo.service';
import { AuthService } from '../services/auth.service';
import { Indirizzo } from '../domain/Indirizzo';
import { User } from '../domain/User';
import { UtenteService } from '../services/utente.service';
import { ProdottoCarrelloService } from '../services/prodotto-carrello.service';
import { RegioneService } from '../services/regione.service';
import { ProvinciaService } from '../services/provincia.service';
import { CittaService } from '../services/citta.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  products: any[]=[];
  static prodottoCarrello: ProdottoCarrello[] = [];
  quantity: number = 0;
  selectedProduct!: string;
  filteredProducts!: any[];
  username: any = "";
  usernameAdmin: any = "";
  usernameCorriere: any = "";
  userImage: string = "https://raker.kemendag.go.id/assets/tanya/assets/img/avatar/ava_laki_3.png";
  position: string = "";
  displayPosition: boolean = false;
  static numInCart: number = 0;
  static prova:any="";
  displayBasic!: boolean;
  user!: User;

  displayDialog: boolean = false;
  avviso!: string;

  citta: string[] = [];
  province: string[] = [];
  regioni: string[] = [];

  cittaSelezionata!: string;
  provinciaSelezionata!: string;
  regioneSelezionata!: string ;
  capSelezionato : string = "";
  viaSelezionata : string = "";

  constructor(private userService: UtenteService, private prodottoService: ProdottoService, private carrelloService: CarrelloService, 
    private router: Router,private indirizzoService: IndirizzoService, private authService: AuthService,
    private prodottoCarrelloService:ProdottoCarrelloService,private regioneService:RegioneService,private provinciaService:ProvinciaService,
    private cittaService:CittaService) {
  }

  ngOnInit(){
    if(sessionStorage.getItem('user') !== null){
      let s: any = sessionStorage.getItem('user');
      this.userService.getUserByUsername(s).subscribe(
        response => {
          this.user = response;
        }
      )
      this.indirizzoService.getIndirizzoByUsername(s).subscribe(
        response1 => {
          this.regioneService.getAllRegioni().subscribe(
            response2=>{
              this.regioni=response2;
              if(!response1 || this.user.indirizzo.via === null){
                this.regioneSelezionata = this.regioni[0];
                this.trovaProvincia();
              }
              else{
                this.regioneSelezionata = this.user.indirizzo.regione;
                this.provinciaSelezionata = this.user.indirizzo.provincia;
                this.cittaSelezionata = this.user.indirizzo.citta;
                this.viaSelezionata = this.user.indirizzo.via;
                this.capSelezionato = this.user.indirizzo.cap;
                this.trovaProvincia();
              }
            }
          );
        }
      )
    }

    this.prodottoService.getProdotti().subscribe(
      response =>{
        this.products = response;
        this.username = sessionStorage.getItem("user");
        this.usernameAdmin = sessionStorage.getItem("userAdmin");
        this.usernameCorriere  = sessionStorage.getItem("userCorriere");
        
        if(this.username != null || this.usernameCorriere != null || this.usernameAdmin != null){
          if(this.username != null){
            NavbarComponent.prova = this.username
            let s: any = sessionStorage.getItem('user');
            this.prodottoCarrelloService.getProdottiInCart(s).subscribe(
            response => {
              NavbarComponent.prodottoCarrello = response;
              for(let i=0; i<NavbarComponent.prodottoCarrello.length; i++){
                this.quantity += NavbarComponent.prodottoCarrello[i].quantita
              }
            } 
          )
          }
          else if (this.usernameCorriere != null)
            NavbarComponent.prova = this.usernameCorriere;
          else
            NavbarComponent.prova = this.usernameAdmin;
          
        }
      }
    )
  }



  trovaProvincia(){
    this.provinciaService.getAllProvince(this.regioneSelezionata).subscribe(
      response=>{
        this.province=response;
        this.trovaCitta(this.province[0]);
      }
    );
  }

  trovaCitta(provincia: string){
    
    this.cittaService.getAllCitta(provincia).subscribe(
      response => {
        this.citta = response;
      }
    )
  }

  showPositionDialog(position: string) {
    this.position = position;
    this.displayPosition = true;
  }

  getNumInCart(){
    this.quantity = 0;
    for(let i=0; i<NavbarComponent.prodottoCarrello.length; i++){
      this.quantity += NavbarComponent.prodottoCarrello[i].quantita
    }
    NavbarComponent.numInCart =  this.quantity;
    return NavbarComponent.numInCart;
  }

  getProva(){
    return NavbarComponent.prova;
  }
  
  ricerca(){
    this.router.navigate(["ricerca"], {queryParams: {result: this.selectedProduct}});
    this.selectedProduct="";
  }

  filterProduct(event: any) {
    let filtered : any[] = [];
    let query = event.query;

    for(let i = 0; i < this.products.length; i++) {
        let product = this.products[i];
        if (product.titolo.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(product.titolo);
        } 
       
    }
    this.filteredProducts = filtered;
  }

  scegliIndirizzo() {
    this.displayBasic = true;
  }

  userIsLogged(){
    if(this.authService.isLogged())
      return true;
    return false;
  }

  somebodyIsLogged(){
    if(this.authService.isLogged() || this.authService.isLoggedAdmin() || this.authService.isLoggedCorriere()){
      return true;
    }
    return false;
  }

  doLogout(){
    
    
    this.authService.clearAll();
    this.authService.clearAllAdmin();
    this.authService.clearAllCorriere();
    this.router.navigate([''])
    .then(() => {
    window.location.reload();
    });
  }

  controlloLogin(){

    if(sessionStorage.getItem("user") !==null || sessionStorage.getItem("userCorriere")!==null || sessionStorage.getItem("userAdmin")!==null)
      return true;
    else
      return false;
  }

  confermaIndirizzo(){
    if(this.capSelezionato.length !== 5){
      this.avviso = "CAP non valido";
      this.displayDialog = true;
      return;
    }

    if(this.cittaSelezionata !== "" && this.provinciaSelezionata !== "" && this.regioneSelezionata !== ""  && this.viaSelezionata !== "" && this.capSelezionato !== ""){
      let indirizzo: Indirizzo = new Indirizzo();
      indirizzo.cap = this.capSelezionato;
      indirizzo.citta = this.cittaSelezionata;
      indirizzo.provincia = this.provinciaSelezionata;
      indirizzo.regione = this.regioneSelezionata;
      indirizzo.via = this.viaSelezionata;
      this.indirizzoService.addIndirizzo(indirizzo, this.user.username).subscribe(
        response => {
          if(response === "Indirizzo aggiunto" || response === "Indirizzo modificato"){
              this.ngOnInit();
              this.displayDialog = false;
              this.avviso = response;
              this.displayDialog = true;
          }
        }
      )
    }
    else{
      this.avviso = "Inserire tutti i parametri";
      this.displayDialog = true;
    } 
  }

  controllaSeLoggatoUtente(){
    if(sessionStorage.getItem('user')!==null){
      return true;
    }
    return false;
  }

  controllaSeLoggatoCorriere(){
    if(sessionStorage.getItem('userCorriere')!==null){
      return true;
    }
    return false;
  }

  controllaSeLoggatoAdmin(){
    if(sessionStorage.getItem('userAdmin')!==null){
      return true;
    }
    return false;
  }

  

}