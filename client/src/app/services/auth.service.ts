import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  //domain = "http://localhost:8080";
  domain = "";
  authToken;
  user;
  options;
  constructor(private _http: Http) { }

  userRegister(value){
    return this._http.post(this.domain + '/authentication/register', value)
                     .map((res:Response) => res.json())
  }
  checkUsername(username){
    return this._http.get(this.domain + '/authentication/checkUsername/' + username)
                     .map((res:Response) => res.json())
  }
  checkEmail(email){
    return this._http.get(this.domain + '/authentication/checkEmail/' + email)
                     .map((res:Response) => res.json())
  }
  login(user){
    return this._http.post(this.domain + '/authentication/login', user)
                     .map((res:Response) => res.json())
  }
  storeUserData(token, user){
    localStorage.setItem('token', token);
    localStorage.setItem('user',  JSON.stringify(user));
  }
  createAuthenticationHeaders(){
    this.loadToken();
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'authorization': this.authToken
      })
    })
  }
  loadToken(){
    const token = localStorage.getItem('token');
    this.authToken = token;
  }
  getProfile(){
    this.createAuthenticationHeaders();
    return this._http.get(this.domain + '/authentication/profile', this.options)
                     .map((res:Response) => res.json())
  }
  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear()
  }
  loggedIn(){
    return tokenNotExpired()
  }
  getPublicProfile(username){
    this.createAuthenticationHeaders();
    return this._http.get(this.domain + '/authentication/publicProfile/' + username, this.options)
                     .map((res:Response) => res.json())
  }
}
//for safty reason,  token need retrieved twice for comparing
