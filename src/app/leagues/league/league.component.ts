import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.css']
})
export class LeagueComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

export class League {
  leagueId: string;
  leagueName: string;
  leagueDescription: string;
  teamSize: number;
  ratingStrategy: string;
  ownerId: number;
  ownerUsername: string;
  numPlayers: number;

  constructor(leagueName: string, leagueDescription: string, teamSize: number, ratingStrategy: string) {
    this.leagueName = leagueName;
    this.leagueDescription = leagueDescription;
    this.teamSize = teamSize;
    this.ratingStrategy = ratingStrategy;
  }
}
