import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginServiceUrl: string = environment.leagueitServiceUrl + '/login';

  constructor(private http: HttpClient) { }

  /** POST: get an identity token for the user **/
  login(request: LoginRequest): Observable<HttpResponse<LoginResponse>> {
    return this.http.post(this.loginServiceUrl, request)
    .pipe(map((response: LoginResponse) => {
      if (response) {
        localStorage.setItem('currentToken', response.token);
        localStorage.setItem('currentUser', response.username);
        localStorage.setItem('tokenExpires', response.expiration.toString());
      }
      return new HttpResponse<LoginResponse>({body: response, status: 200});
    }), catchError((error) => {
      let errorMessage = 'Something went wrong! This may be temporary, please try again later.';
      let errorCode = 500;
      if(error) {
        errorCode = error.status;
        // HTTP Forbidden: invalid credentials supplied
        if(errorCode === 403) {
          errorMessage = 'Username and password combination not found.'
        }
      }
      return of(new HttpResponse<LoginResponse>({statusText: errorMessage, status: errorCode}));
    }));
  }

  logout(): void {
    localStorage.removeItem('currentToken');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('tokenExpires');
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('currentToken') && localStorage.getItem('currentUser') && !this.isTokenExpired();
  }

  isTokenExpired(): boolean {
    return this.tokenTtl() <= 0;
  }

  tokenTtl(): number {
    let expiresString: string = localStorage.getItem('tokenExpires');
    if(!expiresString) {
      return 0;
    }
    let expires: number = (new Date(expiresString)).getTime();
    let current: number = (new Date()).getTime();
    return expires - current;
  }
}

export class LoginRequest {
  username: string;
  password: string;
}

export class LoginResponse {
  username: string;
  expiration: Date;
  token: string;
}
