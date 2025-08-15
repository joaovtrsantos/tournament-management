import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../../account/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../../primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../../../services/account/login.service';
import { ToastrService } from 'ngx-toastr';

interface SignupForm {
  name: FormControl,
  email: FormControl,
  password: FormControl,
  passwordConfirm: FormControl
}

@Component({
  selector: 'app-login',
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent,
  ],
  providers: [LoginService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService
  ) {
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      passwordConfirm: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  submit() {
    this.loginService
      .login(this.signupForm.value.email, this.signupForm.value.password)
      .subscribe({
        next: () => this.toastService.success('Login successfully'),
        error: () => this.toastService.error('Login error. Try again later'),
      });
  }

  navigate() {
    this.router.navigate(['/login']);
  }
}
