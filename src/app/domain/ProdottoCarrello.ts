import { Carrello } from "./Carrello"
import { Prodotto } from "./Prodotto"

export class ProdottoCarrello {
    public id!: number
    public carrello!: Carrello
    public prodotto!: Prodotto
    public quantita!: number 

    constructor(){}
} 