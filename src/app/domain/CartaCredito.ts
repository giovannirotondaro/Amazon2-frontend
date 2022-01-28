import { User } from "./User"

export class CartaCredito{
    public id!: number
    public titolare!: string
    public numeroCarta!: string
    public meseScadenza!: string
    public annoScadenza!: string
    public cvv!: string
    public tipologia!: string
    public utenti!: User[]

    constructor(){}
}