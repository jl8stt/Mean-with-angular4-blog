import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  messageClass;
  message;
  processing=false;
  usernameValid;
  usernameMessage;
  emailValid;
  emailMessage;
  constructor(private _formBuilder: FormBuilder,
              private _authService: AuthService,
              private _router: Router
             ) { }
  userForm = this._formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15), this.validUsernameChecker]],
    email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30), this.validEmailChecker]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16), this.validPasswordChecker]],
    confirmPassword: ['', Validators.required]
  }, { validator: this.matchingPassword('password', 'confirmPassword')})

  validEmailChecker(controls){
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if(regExp.test(controls.value)){
      return null
    } else {
      return {'validEmailChecker': true}
    }
  }

  validUsernameChecker(controls){
      const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
      if(regExp.test(controls.value)){
        return null
      } else {
        return {'validUsernameChecker': true}
      }
  }

  validPasswordChecker(controls){
    const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
    if(regExp.test(controls.value)){
      return null
    } else {
      return {'validPasswordChecker': true}
    }
  }

  matchingPassword(password, confirmPassword){
    return (group) => {
       if(group.controls[password].value===group.controls[confirmPassword].value){
         return null
       } else {
         return {'matchingPassword': true}
       }
     }
  }

  disableForm(){
    this.userForm.controls['email'].disable();
    this.userForm.controls['username'].disable();
    this.userForm.controls['password'].disable()
  }
  enableForm(){
    this.userForm.controls['email'].enable();
    this.userForm.controls['username'].enable();
    this.userForm.controls['password'].enable()
  }

  userSubmit(value){
    this.processing = true;
    this.disableForm();
    this._authService.userRegister(value).subscribe(data => {
      if(!data.success){
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
        this.enableForm()
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout(() => {
          this._router.navigate(['login'])
        }, 2000)
      }
    })
  }
  checkEmail(email){
    this._authService.checkEmail(email).subscribe(data => {
      if(!data.success){
        this.emailValid = false;
        this.emailMessage = data.message
      } else {
        this.emailValid = true;
        this.emailMessage = data.message
      }
    })
  }
  checkUsername(username){
    this._authService.checkUsername(username).subscribe(data => {
      if(!data.success){
        this.usernameValid = false;
        this.usernameMessage = data.message
      } else {
        this.usernameValid = true;
        this.usernameMessage = data.message
      }
    })
  }

  ngOnInit() {
  }

}
