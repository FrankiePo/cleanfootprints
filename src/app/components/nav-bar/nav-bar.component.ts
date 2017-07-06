import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../shared/models/user/user.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {
  loggedIn: boolean;
  subscribtion: Subscription;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.subscribtion = this.userService.isLoggedIn()
      .subscribe(status => this.loggedIn = status);
  }

  ngOnDestroy() {
    this.subscribtion.unsubscribe();
  }
  logout() {
    this.userService.logout().subscribe(_ => this.loggedIn = false);
  }
}
