import { Indirizzo } from "./Indirizzo"
import { Prodotto } from "./Prodotto"
import { Carrello } from "./Carrello"
import { CartaCredito } from "./CartaCredito"
export class User {
    public id!: number
    public nome!: string
    public cognome!: string
    public email!: string
    public password!: string
    public telefono!: string
    public saldo!: number
    public bloccato!: boolean
    public punti!: number
    public immagineProfilo!: string
    public dataNascita!: Date
    public genere: any
    public username!:string
    public carrello!: Carrello
    public indirizzo!: Indirizzo
    public carte!: CartaCredito[]


    public costruttore(id:number, nome:string, cognome:string, email:string, password:string, telefono:string,
                saldo:number, bloccato:boolean, punti:number, immagineProfilo:string, dataNascita:Date, genere:any,username:string
                ){
        this.id=id,
        this.nome=nome,
        this.cognome=cognome,
        this.email=email,
        this.password=password,
        this.telefono=telefono,
        this.saldo=saldo,
        this.bloccato=bloccato,
        this.punti = punti,
        this.immagineProfilo = immagineProfilo,
        this.dataNascita = dataNascita,
        this.genere = genere,
        this.username=username
    }

    constructor(){}
}