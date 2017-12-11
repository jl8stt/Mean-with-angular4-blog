import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AuthguardService } from '../authguard/authguard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  messageClass;
  message;
  processing;
  previousUrl;

  constructor(private _formBuilder: FormBuilder,
              private _authService: AuthService,
              private _router: Router,
              private _authguardService: AuthguardService
             ) { }

  loginForm = this._formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })
  disableForm(){
    this.loginForm.controls['username'].disable();
    this.loginForm.controls['password'].disable()
  }
  enableForm(){
    this.loginForm.controls['username'].enable();
    this.loginForm.controls['password'].enable()
  }
  loginSubmit(value){
    this.processing=true;
    this.disableForm();
    this._authService.login(value).subscribe(data => {
      if(!data.success){
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
        this.enableForm()
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this._authService.storeUserData(data.token, data.user);
        setTimeout(() => {
          if(this.previousUrl){
            this._router.navigate([this.previousUrl])
          } else {
              this._router.navigate(['dashboard'])
          }
        }, 2000)
      }
    })
  }

  ngOnInit() {
    if(this._authguardService.redirectUrl){
      this.messageClass = 'alert alert-danger';
      this.message = 'you must logged in to view that page';
      this.previousUrl = this._authguardService.redirectUrl;
      this._authguardService.redirectUrl = undefined
    }
  }

}
