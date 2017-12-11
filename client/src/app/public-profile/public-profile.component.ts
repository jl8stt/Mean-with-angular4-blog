import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.scss']
})
export class PublicProfileComponent implements OnInit {
  user;
  username;
  messageClass;
  message;
  constructor(private _authService: AuthService,
              private _route: ActivatedRoute
             ) { }

  ngOnInit() {
    this._route.params.subscribe((params:Params) => {
      let username = params['username'];
      this.username = username
    })
    this._authService.getPublicProfile(this.username).subscribe(data => {
      if(!data.success){
        this.messageClass = 'alert alert-danger';
        this.message = data.message
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout(()=>{
          this.message =false;
          this.user = data.user
        }, 2000)
      }

    })
  }

}
