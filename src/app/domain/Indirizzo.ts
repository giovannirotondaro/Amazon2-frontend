import { StringMap } from "@angular/compiler/src/compiler_facade_interface";
import { User } from "./User";
export class Indirizzo {
  public id!: number
  public regione!:string
  public provincia!:string
  public citta!:string
  public via!:string
  public cap!:string
  public user!: User
  constructor(){}
}