import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../shared/models/user/user.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
  sub: Subscription;
  loggedIn = false;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.sub = this.userService.isLoggedIn()
      .subscribe(status => this.loggedIn = status);
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  logout() {
    this.userService.logout().subscribe(_ => this.loggedIn = false);
  }

}
