import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class NotauthguardService implements CanActivate {

  constructor(private _authService:AuthService, private _router:Router) { }
  canActivate(){
    if(this._authService.loggedIn()){
      this._router.navigate(['home'])
      return false
    } else{
      return true
    }
  }
}
