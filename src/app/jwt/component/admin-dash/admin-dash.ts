import { Component } from '@angular/core';
import { Auth } from '../../service/auth';

@Component({
  selector: 'app-admin-dash',
  imports: [],
  templateUrl: './admin-dash.html',
  styleUrl: './admin-dash.scss',
})
export class AdminDash {

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
