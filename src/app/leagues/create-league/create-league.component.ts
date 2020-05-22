import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { LeagueService } from '../league.service';
import { League } from '../league/league.component';

@Component({
  selector: 'app-create-league',
  templateUrl: './create-league.component.html',
  styleUrls: ['./create-league.component.css']
})
export class CreateLeagueComponent implements OnInit {
  maxLeagueNameLength: number = environment.maxLeagueNameLength;
  private leagueNameRegex: string = environment.leagueNameRegex;
  maxLeagueDescriptionLength: number = environment.maxLeagueDescriptionLength;

  ratingStrategyList: any[] = environment.ratingStrategies;

  newLeagueModel: NewLeagueModel = new NewLeagueModel();

  newLeagueForm = new FormGroup({
    'name': new FormControl('', [Validators.required, Validators.maxLength(this.maxLeagueNameLength), Validators.pattern(this.leagueNameRegex)]),
    'description': new FormControl('', [Validators.maxLength(this.maxLeagueDescriptionLength)]),
    'teamSize': new FormControl('', [Validators.required]),
    'ratingStrategy': new FormControl('', [Validators.required]),
  },
  {}
  );

  get name() {
    return this.newLeagueForm.get('name');
  }

  get description() {
    return this.newLeagueForm.get('description');
  }

  get teamSize() {
    return this.newLeagueForm.get('teamSize');
  }

  get ratingStrategy() {
    return this.newLeagueForm.get('ratingStrategy');
  }

  constructor(private router: Router, private leagueService: LeagueService) { }

  ngOnInit() {
  }

  newLeagueSubmit(): void {
    this.newLeagueModel.clearErrors();
    if(this.newLeagueForm.valid) {
      let league: League = new League(this.name.value, this.description.value, this.teamSize.value, this.ratingStrategy.value);
      this.leagueService.createLeague(league).subscribe((response: HttpResponse<League>) => {
        if(response.ok) {
          this.router.navigate(['/home']);
        }
        else {
          this.newLeagueModel.errorMessage = response.statusText;
        }
      });
    }
    else {
      for(let key in this.newLeagueForm.controls) {
        this.newLeagueForm.get(key).markAsTouched({onlySelf: false});
        this.newLeagueForm.get(key).markAsDirty({onlySelf: false});
      }
    }
  }
}

class NewLeagueModel {
  errorMessage?: string;

  clearErrors(): void {
    this.errorMessage = null;
  }
}
