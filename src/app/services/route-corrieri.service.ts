import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteCorrieriService {

  constructor(private authService: AuthService, private route: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state:  RouterStateSnapshot)  {
    
    if (!this.authService.isLoggedCorriere())
    {
      this.route.navigate(['login']);
      return false;
    }
    else 
    {
      return true;
    }
  }
}