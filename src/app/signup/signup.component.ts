import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  private maxUsernameLength: number = 255;
  private maxPasswordLength: number = 255;
  private usernameRegex: string = environment.usernameRegex;

  signupModel: SignupModel = new SignupModel();

  signupForm = new FormGroup({
    'username': new FormControl('', [Validators.required, Validators.maxLength(this.maxUsernameLength), Validators.pattern(this.usernameRegex)]),
    'password': new FormControl('', [Validators.required, Validators.maxLength(this.maxPasswordLength)]),
    'confirmPassword': new FormControl('', []),
  },
  { validators: validatePasswordConfirmation }
  );

  get username() {
    return this.signupForm.get('username');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }

  constructor(private signupService: SignupService, private router: Router) { }

  ngOnInit() {
  }

  signupSubmit(): void {
    this.signupModel.clear();

    // TODO: implement signup service and call here
    console.log("signup submitted!");
  }
}

class SignupModel {
  errorCode?: number;
  errorMessage?: string;

  clear(): void {
    this.errorCode = null;
    this.errorMessage = null;
  }
}

export function validatePasswordConfirmation(group: FormGroup) {
  if (group.get('password').value !== group.get('confirmPassword').value) {
    group.get('confirmPassword').setErrors({ mismatch: true });
    return { mismatch: true };
  }
  group.get('confirmPassword').setErrors(null);
  return null;
}
