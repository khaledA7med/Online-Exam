import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthApiService } from 'auth-api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { Login, LoginForm } from '../../interfaces/login';
import { CardModule } from 'primeng/card';
import { SplitButtonModule } from 'primeng/splitbutton';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    ButtonModule,
    PasswordModule,
    ReactiveFormsModule,
    InputTextModule,
    CardModule,
    SplitButtonModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  loginForm!: FormGroup<LoginForm>;
  items: any[] = [];
  constructor(private _AuthApiService: AuthApiService) {
    this.items = [{ label: 'English' }, { label: 'Arabic' }];
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = new FormGroup<LoginForm>({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  get f(): LoginForm {
    return this.loginForm.controls;
  }

  onSubmit() {
    let data: Login = {
      email: this.f.email.value!,
      password: this.f.password.value!,
    };
    this._AuthApiService.login(data).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    });
  }
}
