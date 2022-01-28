import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import {InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import{InputTextareaModule} from 'primeng/inputtextarea';
import { HomepageComponent } from './homepage/homepage.component'
import { HttpClientModule } from '@angular/common/http';
import {TableModule} from 'primeng/table';
import { ProdottoComponent } from './prodotto/prodotto.component'
import {ImageModule} from 'primeng/image';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import {DropdownModule} from 'primeng/dropdown';
import { RegistrazioneComponent } from './registrazione/registrazione.component';
import {PasswordModule} from 'primeng/password';
import {CalendarModule} from 'primeng/calendar';
import {CheckboxModule} from 'primeng/checkbox';
import {CascadeSelectModule} from 'primeng/cascadeselect';
import {InputNumberModule} from 'primeng/inputnumber';
import {SelectButtonModule} from 'primeng/selectbutton';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {CardModule} from 'primeng/card';
import {AngularFireModule} from '@angular/fire/compat'
import { environment } from "../environments/environment";
import {AngularFireStorageModule,AngularFireStorageReference,AngularFireUploadTask} from "@angular/fire/compat/storage";
import {ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import {DialogModule} from 'primeng/dialog'
import { CarouselModule } from 'primeng/carousel';
import { ChipModule } from 'primeng/chip';
import {InputSwitchModule} from 'primeng/inputswitch';
import {FieldsetModule} from 'primeng/fieldset';
import { CategorieComponent } from './categorie/categorie.component';
import {DataViewModule} from 'primeng/dataview';
import { VendiProdottoComponent } from './vendi-prodotto/vendi-prodotto.component';
import {ColorPickerModule} from 'primeng/colorpicker';
import { LoginComponent } from './login/login.component';
import { TagModule } from 'primeng/tag';
import { PremiComponent } from './premi/premi.component';
import {TabViewModule} from 'primeng/tabview';
import {FileUploadModule} from 'primeng/fileupload';
import { RicercaProdottoComponent } from './ricerca-prodotto/ricerca-prodotto.component';
import { InformazioniPersonaliComponent } from './informazioni-personali/informazioni-personali.component';
import {KnobModule} from 'primeng/knob';
import { CronologiaComponent } from './cronologia/cronologia.component';
import { GestioneAdminComponent } from './gestione-admin/gestione-admin.component';
import {MenubarModule} from 'primeng/menubar';
import { GestioneUtentiComponent } from './gestione-utenti/gestione-utenti.component';
import {OrderListModule} from 'primeng/orderlist';
import { ModificaUtenteAdminComponent } from './modifica-utente-admin/modifica-utente-admin.component';
import {SplitButtonModule} from 'primeng/splitbutton';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {RadioButtonModule} from 'primeng/radiobutton';
import { CarrelloComponent } from './carrello/carrello.component';
import { GestioneCorrieriComponent } from './gestione-corrieri/gestione-corrieri.component';
import { AreaCorriereComponent } from './area-corriere/area-corriere.component';
import { RiepilogoOrdineComponent } from './riepilogo-ordine/riepilogo-ordine.component';
import {AccordionModule} from 'primeng/accordion';
import { AreaPersonaleComponent } from './area-personale/area-personale.component';
import { AcquistiAdminComponent } from './acquisti-admin/acquisti-admin.component';
import { ProdottiVendutiAdminComponent } from './prodotti-venduti-admin/prodotti-venduti-admin.component';
import { AcquistoConfermatoComponent } from './acquisto-confermato/acquisto-confermato.component';
import { ResoComponent } from './reso/reso.component';
import { CronologiaResiComponent } from './cronologia-resi/cronologia-resi.component';
import { GestioneProdottiComponent } from './gestione-prodotti/gestione-prodotti.component';
import { LavoraConNoiComponent } from './lavora-con-noi/lavora-con-noi.component';
import { RecuperaPasswordComponent } from './recupera-password/recupera-password.component';
import { InserisciEmailRecuperoPasswordComponent } from './inserisci-email-recupero-password/inserisci-email-recupero-password.component';
import { SceltaRecuperoComponent } from './scelta-recupero/scelta-recupero.component';
import { RichiesteCorrieriComponent } from './richieste-corrieri/richieste-corrieri.component';
import { FooterComponent } from './footer/footer.component';
import { VisualizzaColloquiComponent } from './visualizza-colloqui/visualizza-colloqui.component';
import { PreferitoComponent } from './preferito/preferito.component';
import {RatingModule} from 'primeng/rating';
import { ProdottiVenditoreComponent } from './prodotti-venditore/prodotti-venditore.component';
import { ModificaProdottoComponent } from './modifica-prodotto/modifica-prodotto.component';
import { ApprovaRecensioneComponent } from './approva-recensione/approva-recensione.component';
import { ControllaEmailComponent } from './controlla-email/controlla-email.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ProdottoComponent,
    RegistrazioneComponent,
    LoginComponent,
    NavbarComponent,
    CategorieComponent,
    VendiProdottoComponent,
    PremiComponent,
    RicercaProdottoComponent,
    InformazioniPersonaliComponent,
    CronologiaComponent,
    GestioneAdminComponent,
    GestioneUtentiComponent,
    ModificaUtenteAdminComponent,
    CarrelloComponent,
    GestioneCorrieriComponent,
    AreaCorriereComponent,
    RiepilogoOrdineComponent,
    AreaPersonaleComponent,
    AcquistiAdminComponent,
    ProdottiVendutiAdminComponent,
    AcquistoConfermatoComponent,
    ResoComponent,
    CronologiaResiComponent,
    GestioneProdottiComponent,
    LavoraConNoiComponent,
    RecuperaPasswordComponent,
    InserisciEmailRecuperoPasswordComponent,
    SceltaRecuperoComponent,
    ControllaEmailComponent,
    RichiesteCorrieriComponent,
    FooterComponent,
    VisualizzaColloquiComponent,
    PreferitoComponent,
    ProdottiVenditoreComponent,
    ModificaProdottoComponent,
    ApprovaRecensioneComponent
  ],
  imports: [
    RatingModule,
    AccordionModule,
    MenubarModule, 
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    InputTextareaModule,
    HttpClientModule,
    TableModule,
    ImageModule,
    BrowserModule,
    BrowserAnimationsModule,
    ProgressSpinnerModule,
    AvatarModule,
    ButtonModule,
    BadgeModule,
    DropdownModule,
    PasswordModule,
    CalendarModule,
    CheckboxModule,
    DialogModule,
    CascadeSelectModule,
    InputNumberModule,
    AutoCompleteModule,
    SelectButtonModule,
    CardModule,
    InputSwitchModule,
    CarouselModule,
    ChipModule,
    AngularFireModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    FieldsetModule,
    DataViewModule,
    ColorPickerModule,
    TagModule,
    TabViewModule,
    FileUploadModule,
    KnobModule,
    CalendarModule,
    OrderListModule,
    SplitButtonModule,
    RadioButtonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, "cloud")],
    bootstrap: [AppComponent],
    providers: [],
})
export class AppModule { }
