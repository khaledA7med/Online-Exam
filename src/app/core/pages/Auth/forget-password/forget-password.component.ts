import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthApiService } from 'auth-api';
import {
  ForgetPassword,
  ForgetPasswordForm,
} from '../../../interfaces/forget-password';
import { Message, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedModule } from '../../../../shared/components/ui/shared/shared.module';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [SharedModule],
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
    private route: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initLoginForm();
  }

  //#region init form
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
  //#endregion

  //#region validation check
  validationChecker(): boolean {
    if (this.forgetPasswordForm.invalid) {
      this.messages = [{ severity: 'error', detail: 'Please check your data' }];
      return false;
    }
    return true;
  }
  //#endregion

  //#region submit form
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
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: res.info,
          });
          // localStorage.setItem('email', data.email);
          this.authService.setUserEmail(data.email);
          setTimeout(() => {
            this.submitted = false;
            this.loading = false;
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
  //#endregion

  ngOnDestroy(): void {
    this.subscription && this.subscription.forEach((s) => s.unsubscribe());
  }
}
