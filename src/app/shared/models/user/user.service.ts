import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../../../environments/environment';
import 'rxjs/add/operator/catch';
import { CookieService } from 'ngx-cookie';

@Injectable()
export class UserService {
  private loggedIn = false;
  private authUrl = `https://cleanfootprint.org/accounts`;
  private headers = new Headers({
    'Content-Type': 'application/json',
  });
  constructor(private http: Http, private cookies: CookieService) {
    // this.loggedIn = !!localStorage.getItem('auth_token');
  }

  login(email, password) {
    // const headers = new Headers();
    // headers.append('Content-Type', 'application/json');

    return this.http;
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }
  getLoginState() {
    return true;
  }
  signUp(name, email, password) {
    const url = `https://cleanfootprint.org/accounts/signup/`;
    const body = JSON.stringify({ email, password });
    this.headers.set('X-CSRFToken', this.cookies.get('csrftoken'));
    const options = new RequestOptions({
      headers: this.headers,
      withCredentials: true,
    });
    return this.http.post(url, body, options)
      .map(res => res.json())
      .map((res) => {
        console.log('signup', res);
        // if (res.success) {
        //   localStorage.setItem('auth_token', res.auth_token);
        //   this.loggedIn = true;
        // }

        return res.success;
      })
      .catch(err => {
        console.error(err);
        return err;
      });
  }
}
