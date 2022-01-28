import { Component, OnInit } from '@angular/core';
import { User } from '../domain/User';
import { UtenteService } from '../services/utente.service';

@Component({
  selector: 'app-premi',
  templateUrl: './premi.component.html',
  styleUrls: ['./premi.component.css']
})
export class PremiComponent implements OnInit {

  user!: User;
  displayDialog: boolean = false;
  avviso!: string;
  constructor(private userService: UtenteService) { }

  ngOnInit(): void {
    let s: any = sessionStorage.getItem('user');
      this.userService.getUserByUsername(s).subscribe(
        response => {
          this.user = response;
        }
      )
  }

  riscuotiPremio(soldi: number, punti: number){
    if(this.user.punti >= punti){
      let s: number = this.user.saldo + soldi;
      let p: number = this.user.punti - punti;
      this.userService.updateUserSaldoPunti(this.user, s, p).subscribe(
        response =>{
          this.avviso = "Hai riscosso il tuo premio, controlla il tuo saldo Techzon"
          this.displayDialog = true;
        }
      )
    }
    else{
      this.avviso = "Non hai abbastanza punti"
      this.displayDialog = true;
    }
  }
}