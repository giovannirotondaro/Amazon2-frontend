import { ProdottoCarrello } from "./ProdottoCarrello"
import { User } from "./User"

export class Carrello {
    public id!: number
    public user!: User
    public prodottoCarrello!: ProdottoCarrello[];

    constructor(){}
} 