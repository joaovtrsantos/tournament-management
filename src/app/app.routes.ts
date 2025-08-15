import { Routes } from '@angular/router';
import { LoginComponent } from './components/pages/account/login/login.component';
import { SignupComponent } from './components/pages/account/signup/signup.component';

export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "signup",
        component: SignupComponent
    }
];
