import { Component, OnInit }from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { LoginService, LoginRequest, LoginResponse } from './login.service';

@Component({
selector: 'app-login',
templateUrl: './login.component.html',
styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private maxUsernameLength: number = environment.maxUsernameLength;
  private maxPasswordLength: number = environment.maxPasswordLength;
  private usernameRegex: string = environment.usernameRegex;

  loginModel: LoginModel = new LoginModel();

  credentialsForm = new FormGroup({
    'username': new FormControl('', [Validators.required, Validators.maxLength(this.maxUsernameLength), Validators.pattern(this.usernameRegex)]),
    'password': new FormControl('', [Validators.required, Validators.maxLength(this.maxPasswordLength)])
  });

  get username() {
    return this.credentialsForm.get('username');
  }

  get password() {
    return this.credentialsForm.get('password');
  }

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  loginSubmit(): void {
    this.loginModel.clearErrors();
    if (this.credentialsForm.valid) {
      let request: LoginRequest = new LoginRequest();
      request.username = this.username.value;
      request.password = this.password.value;
      this.loginService.login(request).subscribe(
        (response: HttpResponse<LoginResponse>) => {
          if(response.ok) {
            this.router.navigate(['/home']);
          }
          else {
            this.loginModel.errorMessage = response.statusText;
          }
        }
      );
    }
    else {
      for (let key in this.credentialsForm.controls) {
        this.credentialsForm.get(key).markAsTouched({onlySelf: false});
        this.credentialsForm.get(key).markAsDirty({onlySelf: false});
      }
    }
  }
}

class LoginModel {
  errorMessage?: string;

  clearErrors(): void {
    this.errorMessage = null;
  }
}
