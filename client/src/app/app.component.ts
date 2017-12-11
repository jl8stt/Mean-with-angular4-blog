import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  constructor(public _authService:AuthService,
              private _flashMessagesService: FlashMessagesService
             ){}
  logout(){
    this._authService.logout();
    this._flashMessagesService.show('you are logout', {cssClass: 'alert alert-info'})
   }
}
