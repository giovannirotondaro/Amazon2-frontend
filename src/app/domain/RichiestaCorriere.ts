import { Time } from "@angular/common"

export class RichiestaCorriere{
    public id!:number
    public nome!: string
    public cognome!:string
    public email!:string
    public telefono!:string
    public dataNascita!:Date
    public genere!: string
    public urlPdf!:string
    public dataColloquio!:Date
    public oraColloquio!:Time
    public hannoColloquio!:boolean
}