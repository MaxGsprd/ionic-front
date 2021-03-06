import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor( 
    private authService: AuthService,
    private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (route.data['authorizedRole'].indexOf(this.authService.getRole()) === -1) {
      this.authService.getRole() === 'ROLE_ADMIN' ? this.router.navigate(['/admin/*']) : this.router.navigate(['/']);
    }
    if (route.data['authorizedRole'].indexOf(this.authService.getRole()) === -1) {
      this.authService.getRole() === 'ROLE_EDITOR' ? this.router.navigate(['/editor/*']) : this.router.navigate(['/']);
    }
    if (route.data['authorizedRole'].indexOf(this.authService.getRole()) === -1) {
      this.authService.getRole() === 'ROLE_MODERATOR' ? this.router.navigate(['/moderator/*']) : this.router.navigate(['/']);
    }
    return route.data['authorizedRole'].indexOf(this.authService.getRole()) !== -1;
  }

}
