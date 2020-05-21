import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-create-league',
  templateUrl: './create-league.component.html',
  styleUrls: ['./create-league.component.css']
})
export class CreateLeagueComponent implements OnInit {
  private maxLeagueNameLength: number = environment.maxLeagueNameLength;
  private leagueNameRegex: string = environment.leagueNameRegex;
  private maxLeagueDescriptionLength: number = environment.maxLeagueDescriptionLength;

  ratingStrategyList: string[] = environment.ratingStrategies;

  newLeagueModel: NewLeagueModel = new NewLeagueModel();

  newLeagueForm = new FormGroup({
    'name': new FormControl('', [Validators.required, Validators.maxLength(this.maxLeagueNameLength), Validators.pattern(this.leagueNameRegex)]),
    'description': new FormControl('', [Validators.maxLength(this.maxLeagueDescriptionLength)]),
    'team-size': new FormControl('', [Validators.required]),
    'rating-strategy': new FormControl('', [Validators.required]),
  });

  get name() {
    return this.newLeagueForm.get('name');
  }

  get description() {
    return this.newLeagueForm.get('description');
  }

  get teamSize() {
    return this.newLeagueForm.get('team-size');
  }

  get ratingStrategy() {
    return this.newLeagueForm.get('rating-strategy');
  }

  constructor(private router: Router) { }

  ngOnInit() {
  }

  newLeagueSubmit(): void {
    this.newLeagueModel.clearErrors();
    if(this.newLeagueForm.valid) {
      // TODO: submit to service and handle errors. On success navigate home.
      this.router.navigate(['/home']);
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
