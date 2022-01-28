import { Prodotto } from "./Prodotto"
import { User } from "./User"
import { UtenteProdotto } from "./UtenteProdotto"

export class Preferito {
    public id!:number
    public prodotto!:Prodotto
    public user!:User

    constructor(){}
  }