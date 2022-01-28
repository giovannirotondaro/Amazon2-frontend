import { UtenteProdotto } from "./UtenteProdotto"

export class Reso {
    public id!:number
    public usernameMittente!:string
    public usernameDestinatario!:string
    public numeroOrdine!:UtenteProdotto
    public idProdotto!:number
    public motivoReso!:string
    public quantita!:number
    public prezzo!:number
    public rimborsato!:boolean

    constructor(){}
  }