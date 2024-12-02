import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
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
import { Subscription } from 'rxjs';
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
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup<LoginForm>;
  messages!: Message[];
  submitted: boolean = false;
  loading: boolean = false;
  subscription: Subscription[] = [];

  constructor(
    private _AuthApiService: AuthApiService,
    private messageService: MessageService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.initLoginForm();
    this.loginForm.reset();
  }

  initLoginForm(): void {
    this.loginForm = new FormGroup<LoginForm>({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/),
      ]),
    });
  }

  get f_login(): LoginForm {
    return this.loginForm.controls;
  }

  validationChecker(): boolean {
    if (this.loginForm.invalid) {
      this.messages = [{ severity: 'error', detail: 'Please check your data' }];
      return false;
    }
    return true;
  }

  signin() {
    this.submitted = true;
    if (!this.validationChecker()) return;
    this.loading = true;
    let data: Login = {
      email: this.f_login.email.value!,
      password: this.f_login.password.value!,
    };
    let sub = this._AuthApiService.login(data).subscribe({
      next: (res) => {
        if (res.message === 'success') {
          this.loading = false;
          this.submitted = false;

          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Login Successfully',
          });
          localStorage.setItem('token', res.token);
        }
      },
      error: (err) => {
        this.loading = false;
        this.submitted = false;
        this.messages = [{ severity: 'error', detail: err?.error?.message }];
      },
    });
    this.subscription.push(sub);
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.forEach((s) => s.unsubscribe());
  }
}
