import { User } from "./User"
import { Prodotto } from "./Prodotto"
import { Corriere } from "./Corriere"
import { Reso } from "./Reso"

export class UtenteProdotto {
    public id!: number
    public user!: User
    public prodotto!: Prodotto
    public stato!: string 
    public corriere!: Corriere
    public quantita!: number
    public reso!:Reso

    constructor(){}
} 