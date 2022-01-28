import { User } from "./User"

export class SegnalazioneUtente{
    public id!: number
    public motivazionePrincipale!:string
    public motivazioneAggiuntiva!:string
    public utenteSegnalato!:User
    public utenteCheFaSegnalazione!:User

    constructor(){}
}