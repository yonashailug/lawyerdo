import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService, private router: Router) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const user: User = this.authenticationService.getUser()

      let activate = false
      if(Object.keys(user).length) {

          // TODO: - Do something with a role
          // let userScope = user.getRole().toUpperCase()
          // let scopes = route.data['scopes'] as Array<string>
          // activate = (scopes && scopes.length === 0 || scopes.indexOf(userScope) != -1)

          activate = true
      }

      if(!activate) return this.router.navigateByUrl('/')

      return true
  }
  
}
