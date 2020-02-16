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
	ownerUsername: string;
	leagueName: string;
	leagueDescription: string;
	teamSize: number;
	ratingStrategy: string;
	numPlayers: number;
}