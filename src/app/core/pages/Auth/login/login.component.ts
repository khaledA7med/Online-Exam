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
import { Router, RouterModule } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
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
    MessagesModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup<LoginForm>;
  messages!: Message[];

  constructor(
    private _AuthApiService: AuthApiService,
    private messageService: MessageService,
    private route: Router
  ) {}

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
      next: (res) => {
        if (res.message === 'success') {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Login Successfully',
          });
          localStorage.setItem('token', res.token);
        }
        console.log(res);
      },
      error: (err) =>
        (this.messages = [{ severity: 'error', detail: err?.error?.message }]),
    });
  }
}
