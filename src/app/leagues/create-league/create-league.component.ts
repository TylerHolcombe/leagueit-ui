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
  // TODO implement max lengths for free text fields
  private maxLeagueNameLength: number = environment.maxUsernameLength;
  private leagueNameRegex: string = environment.usernameRegex;
  private maxLeagueDescriptionLength: number = 500;

  newLeagueModel: NewLeagueModel = new NewLeagueModel();

  newLeagueForm = new FormGroup({
    'name': new FormControl('', [Validators.required, Validators.maxLength(this.maxLeagueNameLength), Validators.pattern(this.leagueNameRegex)]),
    'description': new FormControl('', [Validators.required, Validators.maxLength(this.maxLeagueDescriptionLength)]),
    'team-size': new FormControl('', [Validators.required]),
  },
  );

  get name() {
    return this.newLeagueForm.get('name');
  }

  get description() {
    return this.newLeagueForm.get('description');
  }

  get teamSize() {
    return this.newLeagueForm.get('team-size');
  }

  constructor() { }

  ngOnInit() {
  }

}

class NewLeagueModel {
  errorMessage?: string;

  clearErrors(): void {
    this.errorMessage = null;
  }
}
