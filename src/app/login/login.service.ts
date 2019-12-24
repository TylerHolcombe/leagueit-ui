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
    .pipe(map((response: HttpResponse<LoginResponse>) => {
      if (response.ok) {
        localStorage.setItem('currentToken', response.body.token);
        localStorage.setItem('currentUser', response.body.username);
        localStorage.setItem('tokenExpires', response.body.expiration.toString());
      }
      return response;
    }), catchError((error) => {
      let errorMessage = 'Something went wrong! This may be temporary, please try again later.';
      let errorCode = 500;
      if(error) {
        // HTTP Forbidden: invalid credentials supplied
        if(error.status === 403) {
          errorCode = 403;
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
}

export class LoginRequest {
  username: string;
  password: string;
}

export class LoginResponse {
  username: string;
  expiration: Date;
}
