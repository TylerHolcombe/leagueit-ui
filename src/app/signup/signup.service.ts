import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private signupServiceUrl: string = environment.leagueitServiceUrl + '/users/signup';

  constructor(private http: HttpClient) { }

  /** POST: attempt to create a new user **/
  signup(request: SignupRequest): Observable<HttpResponse<SignupResponse>> {
    return this.http.post(this.signupServiceUrl, request)
    .pipe(map((response: SignupResponse) => {
      return new HttpResponse<SignupResponse>({body: response, status: 200});
    }), catchError((error) => {
      let errorMessage = 'Something went wrong! This may be temporary, please try again later.';
      let errorCode = 500;
      if(error) {
        errorCode = error.status;
        if(errorCode === 409) {
          errorMessage = 'Username is already taken.';
        }
      }
      return of(new HttpResponse<SignupResponse>({statusText: errorMessage, status: errorCode}));
    }));
  }
}

export class SignupRequest {
  username: string;
  password: string;
}

export class SignupResponse {
  userId: number;
}
