import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private router:Router){

  }

  canActivate(): boolean{
    if (!localStorage.getItem('currentUser')){
      this.router.navigate(['auth/user/login'])
      return false
    }return true
  }
  
}
