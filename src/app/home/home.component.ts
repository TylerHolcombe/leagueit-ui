import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { LeagueService, GetLeaguesRequest, GetLeaguesResponse } from '../leagues/league.service';
import { League } from '../leagues/league/league.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  homeModel: HomeModel = new HomeModel();

  constructor(private leagueService: LeagueService, private router: Router) { }

  ngOnInit() {
    this.homeModel.username = localStorage.getItem('currentUser');
    var request: GetLeaguesRequest = new GetLeaguesRequest();
    request.username = this.homeModel.username;
    this.leagueService.getLeagues(request).subscribe(
      (response: HttpResponse<GetLeaguesResponse>) => {
        if(response.ok) {
          this.homeModel.leagues = [];
          this.homeModel.leagues.push.apply(this.homeModel.leagues, response.body.leagues);
        }
        else {
          this.homeModel.errorCode = response.status;
          this.homeModel.errorMessage = response.statusText;
        }
      }
    );
  }
}

class HomeModel {
  username: string = "";
  leagues?: Array<League>;

  errorCode?: number;
  errorMessage?: string;
}
