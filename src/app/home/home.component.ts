import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../login/login.service';
import { League } from '../leagues/league/league.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  homeModel: HomeModel = new HomeModel();

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    // TODO: temp. Remove for actual implementation.
    this.homeModel.username = "Tyler";
    var league: League = new League();
    league.leagueDescription = "This is a test league. Foosball.";
    league.leagueName = "Chase Foos";
    league.ratingStrategy = "GROUP_ELO";
    league.teamSize = 2;
    league.ownerUsername = "Tom Demarco";
    league.numPlayers = 20;
    this.homeModel.leagues.push(league);
  }

  // TODO: temp. Remove for actual implementation.
  onClick() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}

class HomeModel {
  username: string = "";
  leagues?: Array<League> = [];
}
