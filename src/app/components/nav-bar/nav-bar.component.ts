import { Component } from '@angular/core';
import { UserService } from '../../shared/models/user/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  constructor(private userService: UserService) { }

  isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

  logout() {
    this.userService.logout()
  }
}
