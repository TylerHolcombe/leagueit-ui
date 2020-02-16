import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { SignupService, SignupRequest, SignupResponse } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  private maxUsernameLength: number = environment.maxUsernameLength;
  private maxPasswordLength: number = environment.maxPasswordLength;
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
    this.signupModel.clearErrors();
    if(this.signupForm.valid) {
      let request: SignupRequest = new SignupRequest();
      request.username = this.username.value;
      request.password = this.password.value;
      this.signupService.signup(request).subscribe((response: HttpResponse<SignupResponse>) => {
        if(response.ok) {
          this.router.navigate(['/login']);
        }
        else {
          this.signupModel.errorMessage = response.statusText;
        }
      });
    }
    else {
      for(let key in this.signupForm.controls) {
        this.signupForm.get(key).markAsTouched({onlySelf: false});
        this.signupForm.get(key).markAsDirty({onlySelf: false});
      }
    }
  }
}

class SignupModel {
  errorMessage?: string;

  clearErrors(): void {
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
