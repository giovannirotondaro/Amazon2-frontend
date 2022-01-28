import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { ProdottoComponent } from './prodotto/prodotto.component';
import { RegistrazioneComponent } from './registrazione/registrazione.component';
import { VendiProdottoComponent } from './vendi-prodotto/vendi-prodotto.component';
import { PremiComponent } from './premi/premi.component';
import { CategorieComponent } from './categorie/categorie.component';
import { RicercaProdottoComponent } from './ricerca-prodotto/ricerca-prodotto.component';
import { InformazioniPersonaliComponent } from './informazioni-personali/informazioni-personali.component';
import { CronologiaComponent } from './cronologia/cronologia.component';
import { GestioneAdminComponent } from './gestione-admin/gestione-admin.component';
import { GestioneUtentiComponent } from './gestione-utenti/gestione-utenti.component';
import { RouteGuardService } from './services/route-guard.service';
import { ModificaUtenteAdminComponent } from './modifica-utente-admin/modifica-utente-admin.component';
import { CarrelloComponent } from './carrello/carrello.component';
import { GestioneCorrieriComponent } from './gestione-corrieri/gestione-corrieri.component';
import { AreaCorriereComponent } from './area-corriere/area-corriere.component';
import { RiepilogoOrdineComponent } from './riepilogo-ordine/riepilogo-ordine.component';
import { AreaPersonaleComponent } from './area-personale/area-personale.component';
import { AcquistiAdminComponent } from './acquisti-admin/acquisti-admin.component';
import { ProdottiVendutiAdminComponent } from './prodotti-venduti-admin/prodotti-venduti-admin.component';
import { AcquistoConfermatoComponent } from './acquisto-confermato/acquisto-confermato.component';
import { CronologiaResiComponent } from './cronologia-resi/cronologia-resi.component';
import { ResoComponent } from './reso/reso.component';
import { GestioneProdottiComponent } from './gestione-prodotti/gestione-prodotti.component';
import { LavoraConNoiComponent } from './lavora-con-noi/lavora-con-noi.component';
import { RouteCorrieriService } from './services/route-corrieri.service';
import { RouteAdminService } from './services/route-admin.service';
import { RecuperaPasswordComponent } from './recupera-password/recupera-password.component';
import { InserisciEmailRecuperoPasswordComponent } from './inserisci-email-recupero-password/inserisci-email-recupero-password.component';
import { SceltaRecuperoComponent } from './scelta-recupero/scelta-recupero.component';
import { RichiesteCorrieriComponent } from './richieste-corrieri/richieste-corrieri.component';
import { VisualizzaColloquiComponent } from './visualizza-colloqui/visualizza-colloqui.component';
import { PreferitoComponent } from './preferito/preferito.component';
import { ProdottiVenditoreComponent } from './prodotti-venditore/prodotti-venditore.component';
import { ModificaProdottoComponent } from './modifica-prodotto/modifica-prodotto.component';
import { ApprovaRecensioneComponent } from './approva-recensione/approva-recensione.component';

const routes: Routes = [
  {path:'approvaRecensione', component: ApprovaRecensioneComponent},
  {path:'modificaProdotto/:id', component: ModificaProdottoComponent},
  {path:'prodottiVenditore', component:ProdottiVenditoreComponent},
  {path:'preferiti', component:PreferitoComponent, canActivate: [RouteGuardService]},
  {path:'visualizzaColloqui',component: VisualizzaColloquiComponent, canActivate: [RouteAdminService]},
  {path:'richiesteCorrieri',component: RichiesteCorrieriComponent, canActivate: [RouteAdminService]},
  {path:'sceltaRecupero', component:SceltaRecuperoComponent},
  {path:'inserisciEmailRecuperoPassword', component:InserisciEmailRecuperoPasswordComponent},
  {path:'recuperaPassword', component:RecuperaPasswordComponent,},
  {path:'lavoraConNoi', component:LavoraConNoiComponent},
  {path:'gestioneProdotti', component:GestioneProdottiComponent, canActivate: [RouteAdminService]},
  {path:'cronologiaResi', component:CronologiaResiComponent, canActivate: [RouteGuardService]},
  {path:'reso/:id', component:ResoComponent , canActivate: [RouteGuardService]},
  {path:'acquistiAdmin', component: AcquistiAdminComponent, canActivate: [RouteAdminService]},
  {path:'prodottiVendutiAdmin', component: ProdottiVendutiAdminComponent, canActivate: [RouteAdminService]},
  {path:'areaPersonale', component:AreaPersonaleComponent, canActivate: [RouteGuardService]},
  {path:'areaCorriere', component:AreaCorriereComponent, canActivate: [RouteCorrieriService]},
  {path:'gestioneCorrieri', component:GestioneCorrieriComponent, canActivate: [RouteCorrieriService]},
  {path:'modificaUtenteAdmin', component:ModificaUtenteAdminComponent,  canActivate: [RouteAdminService]},
  {path:'gestioneUtenti', component:GestioneUtentiComponent,  canActivate: [RouteAdminService]},
  {path:'gestioneAdmin', component:GestioneAdminComponent,  canActivate: [RouteAdminService]},
  {path:'cronologia', component:CronologiaComponent, canActivate: [RouteGuardService]},
  {path:'carrello/riepilogo', component:RiepilogoOrdineComponent, canActivate: [RouteGuardService]},
  {path:'carrello/riepilogo/ordine', component:AcquistoConfermatoComponent, canActivate: [RouteGuardService]},
  {path:'carrello', component: CarrelloComponent, canActivate: [RouteGuardService]},
  {path:'informazioniPersonali', component:InformazioniPersonaliComponent, canActivate: [RouteGuardService]},
  {path:'premi', component: PremiComponent, canActivate: [RouteGuardService]},
  {path:'prodotto/:id', component: ProdottoComponent},
  {path:'ricerca', component: RicercaProdottoComponent},
  {path:'login', component: LoginComponent},
  {path:'registrazione', component: RegistrazioneComponent},
  {path:'vendi', component: VendiProdottoComponent, canActivate: [RouteGuardService]},
  {path:':categoria', component: CategorieComponent},
  {path:'**', component: HomepageComponent},
  {path:'', component: HomepageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
