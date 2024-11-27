import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthApiService } from 'auth-api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { Login, LoginForm } from '../../../interfaces/login';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonModule,
    PasswordModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup<LoginForm>;

  constructor(private _AuthApiService: AuthApiService) {}

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm(): void {
    this.loginForm = new FormGroup<LoginForm>({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  get f_login(): LoginForm {
    return this.loginForm.controls;
  }

  signin() {
    let data: Login = {
      email: this.f_login.email.value!,
      password: this.f_login.password.value!,
    };
    this._AuthApiService.login(data).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    });
  }
}
