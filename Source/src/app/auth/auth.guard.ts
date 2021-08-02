import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RoleService } from './role.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public roleService: RoleService, public router: Router) { 
  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      let urlCore: string = route.url[0].toString();

      console.log("AuthGuard called for URL: " + urlCore + 
                  ", user: " + this.roleService.loggedEmail +
                  ", role: " + this.roleService.loggedRole);
      
      if (urlCore == 'add') {
        if (this.roleService.loggedEmail == null) { this.router.navigate(['/']); return false; } 
        if (this.roleService.loggedRole != this.roleService.ROLE_ADMIN && 
            this.roleService.loggedRole != this.roleService.ROLE_PRAC) { this.router.navigate(['/']); return false; }
          
        return true;
      }

      if (urlCore == 'basket') {
        if (this.roleService.loggedEmail == null) { this.router.navigate(['/']); return false; }
        if (this.roleService.loggedRole != this.roleService.ROLE_KLIENT && 
            this.roleService.loggedRole != this.roleService.ROLE_VIP) { this.router.navigate(['/']); return false; }
          
        return true;
      }

      if (urlCore == 'settings') {
        if (this.roleService.loggedEmail == null) { this.router.navigate(['/']); return false; }
        if (this.roleService.loggedRole != this.roleService.ROLE_ADMIN) { this.router.navigate(['/']); return false; }
          
        return true;
      }

      if (urlCore == 'tripDetail') {
        if (this.roleService.loggedEmail == null) { this.router.navigate(['/']); return false; }
          
        return true;
      }

      if (urlCore == 'login') {
        if (this.roleService.loggedEmail != null) { this.router.navigate(['/']); return false; }
          
        return true;
      }

      if (urlCore == 'register') {
        if (this.roleService.loggedEmail != null &&
          this.roleService.loggedRole != this.roleService.ROLE_ADMIN) { this.router.navigate(['/']); return false; }
          
        return true;
      }

      if (urlCore == 'logout') {
        if (this.roleService.loggedEmail == null) { this.router.navigate(['/']); return false; }
          
        return true;
      }

      
  }
  
}
