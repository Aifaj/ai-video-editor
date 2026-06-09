import { Component } from '@angular/core';
import { Auth } from '../../service/auth';

@Component({
  selector: 'app-user-dash',
  imports: [],
  templateUrl: './user-dash.html',
  styleUrl: './user-dash.scss',
})
export class UserDash {

  constructor(private authService: Auth) { }

  GetNormalUser() {
    this.authService.getNormalUser().subscribe(
      (res) => {
        console.log(res);
      }
    );
  }

  GetAdminUser() {
    this.authService.getAdminuser().subscribe(
      (res) => {
        console.log(res);
      }
    );
  }

  logout() {
    this.authService.logout().subscribe(
      (res) => {
        console.log(res);
        if (res.success) {
          window.location.href = '/jwtLogin';
        }
      }
    );
  }

}
