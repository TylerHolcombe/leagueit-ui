import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { League } from './league/league.component';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {
  private leagueServiceUrl: string = environment.leagueitServiceUrl + '/leagues';

  constructor(private http: HttpClient) { }

  /** GET: Get all leagues that user belongs to **/
  getLeagues(request: GetLeaguesRequest): Observable<HttpResponse<GetLeaguesResponse>> {
    return this.http.get(this.leagueServiceUrl + '?playerUsername=' + request.username)
    .pipe(map((response: Array<League>) => {
      return new HttpResponse<GetLeaguesResponse>({body: new GetLeaguesResponse(response), status: 200});
    }), catchError((error) => {
      let errorMessage = 'Something went wrong! This may be temporary, please try again later.';
      let errorCode = 500;
      if(error) {
        errorCode = error.status;
        if(errorCode === 404) {
          errorMessage = error.errorMessage;
        }
      }
      return of(new HttpResponse<GetLeaguesResponse>({statusText: errorMessage, status: errorCode}));
    }));
  }

  /** POST: Create a new league owned by the currently logged in user **/
  createLeague(request: League): Observable<HttpResponse<League>> {
    return this.http.post(this.leagueServiceUrl, request)
    .pipe(map((response: League) => {
      return new HttpResponse<League>({body: response, status: 200});
    }), catchError((error) => {
      let errorMessage = 'Something went wrong! This may be temporary, please try again later.';
      let errorCode = 500;
      if(error) {
        errorCode = error.status;
      }
      return of(new HttpResponse<League>({statusText: errorMessage, status: errorCode}));
    }));
  }
}

export class GetLeaguesRequest {
  username: string;
}
export class GetLeaguesResponse {
  leagues: Array<League>;

  constructor(leagues: Array<League>) {
    this.leagues = leagues;
  }
}
