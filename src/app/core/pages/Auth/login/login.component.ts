import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthApiService } from 'auth-api';
import { Login, LoginForm } from '../../../interfaces/login';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { SharedModule } from '../../../../shared/components/ui/shared/shared.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
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
  }

  //#region init form
  initLoginForm(): void {
    this.loginForm = new FormGroup<LoginForm>({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        ),
      ]),
    });
  }

  get f_login(): LoginForm {
    return this.loginForm.controls;
  }
  //#endregion

  //#region validation check
  validationChecker(): boolean {
    if (this.loginForm.invalid) {
      this.messages = [{ severity: 'error', detail: 'Please check your data' }];
      return false;
    }
    return true;
  }
  //#endregion

  //#region submit form
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
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Login Successfully',
          });
          localStorage.setItem('token', res.token);
          this.submitted = false;
          this.loading = false;
          this.route.navigate(['/dashboard']);
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
  //#endregion

  ngOnDestroy(): void {
    this.subscription && this.subscription.forEach((s) => s.unsubscribe());
  }
}
