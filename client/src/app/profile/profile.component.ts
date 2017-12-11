import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  username;
  email;
  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this._authService.getProfile().subscribe((data) => {
      this.username = data.user.username;
      this.email = data.user.email
    })
  }

}
