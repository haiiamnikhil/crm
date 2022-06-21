import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EntitlementsService } from '../service/AUTHO/entitlements.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private router:Router, private entService:EntitlementsService){

  }

  canActivate(): boolean{
    if (!localStorage.getItem('currentUser')){
      this.router.navigate(['/auth/user/login'])
      return false
    }
    return true
  }
  
}
