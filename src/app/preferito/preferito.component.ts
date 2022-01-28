import { Component, OnInit } from '@angular/core';
import { Preferito } from '../domain/Preferito';
import { PreferitoService } from '../services/preferito.service';
@Component({
  selector: 'app-preferito',
  templateUrl: './preferito.component.html',
  styleUrls: ['./preferito.component.css']
})
export class PreferitoComponent implements OnInit {

    preferiti:Preferito[] = []
    username: any = "";

    constructor(
        private PreferitoService:PreferitoService,
    ) { }

    ngOnInit() {
        this.username = sessionStorage.getItem("user");
        this.PreferitoService.getPreferiti(this.username).subscribe(response => {
            this.preferiti=response; 
        });
    }

    rimuoviPreferito(preferito: Preferito) { 
        this.PreferitoService.rimuoviPreferito(preferito).subscribe(
            result => this.ngOnInit()
        );;
    }

    title = 'Card View Demo';

    gridColumns = 3;
    
    toggleGridColumns() {
        this.gridColumns = this.gridColumns === 3 ? 4 : 3;
    }
}


