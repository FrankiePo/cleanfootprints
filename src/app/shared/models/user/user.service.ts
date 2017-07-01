import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../../../environments/environment';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
  private loggedIn = false;
  private authUrl = `https://cleanfootprint.org/accounts`;
  private requestOptions = new RequestOptions({
    headers: new Headers({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    }),
    withCredentials: true,
  });
  constructor(private http: Http) {
    this.getState().subscribe(status => this.loggedIn = status);
  }

  getState(): Observable<boolean> {
    return this.http.get(`${environment.apiUrl}user/get_state/`)
      .map(res => res.json() as { is_authenticated: boolean })
      .map(res => res.is_authenticated)
  }

  login(email, password): Observable<any> {
    const url = `${this.authUrl}/login/`;
    const body = JSON.stringify({ email, password });
    const options = this.requestOptions;
    return this.http.post(url, body, options)
      .map(res => res.json())
      .map(res => {
        console.log(res);
        return res;
      })
      .catch(err => err);
  }

  logout(): Observable<boolean> {
    const url = `${this.authUrl}/logout/`;
    const options = this.requestOptions;
    return this.http.post(url, null, options)
      .map(res => res.json())
      .catch(err => {
        console.error(err);
        return err;
      });
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  signUp(name, email, password1): Observable<boolean | string> {
    const url = `${this.authUrl}/signup/`;
    // const body = JSON.stringify({ email, password1 });
    const body = { email, password1 };
    const options = this.requestOptions;
    return this.http.post(url, body, options)
      .map(res => res.json())
      .map((res) => {
        console.log('signup', res);
        if (res.success) {
          // this.loggedIn = true;
        }

        return res.success;
      })
      .catch(err => {
        console.error(err);
        return err;
      });
  }
}
