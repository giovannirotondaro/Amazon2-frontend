import { Recensione } from "./Recensione";
import { User } from "./User";
import { ProdottoCarrello } from "./ProdottoCarrello";
export class Prodotto {
  public id!: number
  public titolo!: string
  public anteprima!: string
  public descrizione!: string
  public categoria!: string
  public dimensioni!: string
  public peso!: number
  public memoriaRam!: string
  public marca!: string
  public modello!: string
  public prezzo!: number
  public sconto!: number
  public colore!: string
  public disponibile!: boolean
  public quantita!: number
  public dataAggiunta!: Date
  public url1!: string
  public url2!: string
  public url3!: string
  public url4!: string
  public vendutoDa!: User
  public memoriaArchiviazione!:string
  /*public aggiuntoDa!:User*/
  public recensioni!:Recensione[]
  /*public presenteNelCarrello!: ProdottoCarrello[]*/

  constructor(
    
  ){ }
}