import { Component } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title:any;
  stringa:any;
  textArea:any;
  localUrl!: any[];
  route!: string;

  changeText()
  {
     this.stringa="hai inviato questo messaggio"+this.title;
     if(this.textArea!=undefined)
     this.textArea=this.textArea+this.title+"/n";
     else
     this.textArea=this.title+"/n";
  }

  constructor(location: Location, router: Router) {
    router.events.subscribe(val => {
      if (location.path() != "") {
        this.route = location.path();
      } else {
        this.route = "Home";
      }
    });
  }

  ngOnInit() {}
  
  
}
