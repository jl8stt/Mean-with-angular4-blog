import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthguardService  implements CanActivate {
  redirectUrl;
  constructor(private _authService:AuthService, private _router:Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ){
    if(this._authService.loggedIn()){
      return true
    } else{
      this.redirectUrl = state.url;
      this._router.navigate(['login']);
      return false
    }
  }
// everytime browser try to acess new component through router
// ActivatedRouteSnapshot will retrieve url from browser
// and stored url into RouterStateSnapshot
// no matter the access is successful or failed.
//in summary, RouterStateSnapshot need ActivatedRouteSnapshot to help catch url, then store it.

}
