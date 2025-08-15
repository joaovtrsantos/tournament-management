import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../../account/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../../primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../../../services/account/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers: [
    LoginService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService
  ){
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  submit(){
    this.loginService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe({
        next: () => this.toastService.success('Login successfully'),
        error: () => this.toastService.error('Login error. Try again later'),
      });
  }

  navigate(){
    this.router.navigate(["/signup"]);
  }
}
