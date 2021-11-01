import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthserviceService } from '../app/services/authservice.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private route: Router, private authService: AuthserviceService,) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean> | boolean | UrlTree {
      const token:any = localStorage.getItem('jwt_token'); // get token from local storage
      if (!token){
        this.route.navigate(['']);
        // go to login if not authenticated
        return true;
      }
      return true;
  }
}
