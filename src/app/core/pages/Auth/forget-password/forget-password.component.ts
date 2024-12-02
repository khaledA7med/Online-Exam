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
import {
  ForgetPassword,
  ForgetPasswordForm,
} from '../../../interfaces/forget-password';
import { Message, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { MessagesModule } from 'primeng/messages';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [
    ButtonModule,
    PasswordModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    MessagesModule,
  ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
  providers: [MessageService],
})
export class ForgetPasswordComponent implements OnInit, OnDestroy {
  forgetPasswordForm!: FormGroup<ForgetPasswordForm>;
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

  initLoginForm(): void {
    this.forgetPasswordForm = new FormGroup<ForgetPasswordForm>({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ]),
    });
  }

  get f_forgetPassword(): ForgetPasswordForm {
    return this.forgetPasswordForm.controls;
  }

  validationChecker(): boolean {
    if (this.forgetPasswordForm.invalid) {
      this.messages = [{ severity: 'error', detail: 'Please check your data' }];
      return false;
    }
    return true;
  }

  forgetPassword() {
    this.submitted = true;
    if (!this.validationChecker()) return;
    this.loading = true;
    let data: ForgetPassword = {
      email: this.f_forgetPassword.email.value!,
    };
    let sub = this._AuthApiService.forgetPassword(data).subscribe({
      next: (res) => {
        if (res.message === 'success') {
          this.submitted = false;
          this.loading = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: res.info,
          });
          localStorage.setItem('email', data.email);
          setTimeout(() => {
            this.route.navigate(['/verify-code']);
          }, 3000);
        }
      },
      error: (err) => {
        this.submitted = false;
        this.loading = false;
        this.messages = [{ severity: 'error', detail: err?.error?.message }];
      },
    });
    this.subscription.push(sub);
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.forEach((s) => s.unsubscribe());
  }
}
