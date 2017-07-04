import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../../../environments/environment';
import { IUser } from 'app/shared/models/user/iuser';

@Injectable()
export class UserService {
  private user = new BehaviorSubject(null);
  private loggedIn = new BehaviorSubject(false);
  private authUrl = `${environment.apiUrl}user/`;
  private requestOptions = new RequestOptions({
    headers: new Headers({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    }),
    withCredentials: true,
  });

  constructor(private http: Http) {
    this.updateState();
  }

  private updateState(): Subscription {
    return this.http.get(`${this.authUrl}get_state/`)
      .map(res => res.json() as { is_authenticated: boolean, user: IUser })
      .map(res => {
        console.log('(UserService) updateState: ', res);
        return res;
      })
      // .catch(errRes => errRes.json())
      .subscribe(res => {
        this.loggedIn.next(res.is_authenticated);
        if (res.is_authenticated) {
          this.user.next(res.user);
        }
      });
  }
  getUser(): Observable<IUser> {
    return this.user.asObservable();
  }

  login(email, password): Observable<any> {
    const url = `${this.authUrl}login/`;
    const body = JSON.stringify({email, password});
    const options = this.requestOptions;
    return this.http.post(url, body, options)
      .map(res => res.json())
      .map(res => {
        this.updateState();
        return res;
      })
      .catch(err => err);
  }

  logout(): Observable<boolean> {
    const url = `${this.authUrl}logout/`;
    const options = this.requestOptions;
    return this.http.post(url, null, options)
      .map(res => {
        this.updateState();
        return res.json();
      })
      .catch(err => {
        console.error(err);
        return err;
      });
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  signUp(email, password): Observable<boolean | string> {
    const url = `${this.authUrl}sign_up/`;
    const body = {email, password};
    const options = this.requestOptions;
    return this.http.post(url, body, options)
      .map(res => res.json())
      .map((res) => {
        if (res.success) {
          this.updateState();
        }
        return res.success;
      })
      .catch(err => this.handleError(err));
  }
  private extractData(res: Response | any) {

  }
  private handleError(error: Response | any): string | any {
    // In a real world app, you might use a remote logging infrastructure
    console.warn('raw', error);
    if (error instanceof Response) {
      const body = error.json() || '';
      console.log('(UserService) handleError:', body);
      return Observable.throw(body);
    } else {
      const errMsg = error.message ? error.message : error.toString();
      console.log('(UserService) handleError:', errMsg);
      return Observable.throw(errMsg);
    }
  }
}
