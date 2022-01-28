import { StringMap } from "@angular/compiler/src/compiler_facade_interface";
import { Prodotto } from "./Prodotto";
import { User } from "./User";

export class Recensione {
  public id!:number
  public recensione!:string
  public dataAggiunta!:Date
  public creataDa!:User
  public prodottoRecensito!:Prodotto
  public approvata!:boolean;
	public rating!: number;

  constructor(){}
}