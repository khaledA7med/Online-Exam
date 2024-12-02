import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthApiService } from 'auth-api';
import { Router } from '@angular/router';
import { Verify, VerifyForm } from '../../../interfaces/verify';
import { Message, MessageService } from 'primeng/api';
import { ForgetPassword } from '../../../interfaces/forget-password';
import { Subscription } from 'rxjs';
import { SharedModule } from '../../../../shared/components/ui/shared/shared.module';

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.scss',
  providers: [MessageService],
})
export class VerifyComponent implements OnInit, OnDestroy {
  verifyForm!: FormGroup<VerifyForm>;
  messages!: Message[];
  submitted: boolean = false;
  loading: boolean = false;
  subscription: Subscription[] = [];

  resendDisabled: boolean = false;
  timeRemaining: number = 60;
  timerInterval: any;

  constructor(
    private _AuthApiService: AuthApiService,
    private messageService: MessageService,
    private route: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initVerifyForm();
    this.startResendTimer();
  }

  initVerifyForm(): void {
    this.verifyForm = new FormGroup<VerifyForm>({
      resetCode: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
        Validators.pattern(/^[0-9]{6}$/),
      ]),
    });
  }

  get f_verify(): VerifyForm {
    return this.verifyForm.controls;
  }

  startResendTimer(): void {
    this.resendDisabled = true;
    this.timeRemaining = 60;
    this.timerInterval = setInterval(() => {
      if (this.timeRemaining > 0) {
        this.timeRemaining--;
        this.cdr.detectChanges();
      } else {
        this.resendDisabled = false;
        clearInterval(this.timerInterval);
        this.cdr.detectChanges();
      }
    }, 1000);
  }

  // Resend code function
  resendCode(): void {
    this.resendOtp();
  }

  resendOtp() {
    this.startResendTimer();
    let data: ForgetPassword = {
      email: localStorage.getItem('email')!,
    };
    let sub = this._AuthApiService.forgetPassword(data).subscribe({
      next: (res) => {
        if (res.message === 'success') {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: res.info,
          });
        }
      },
      error: (err) => {
        this.messages = [{ severity: 'error', detail: err?.error?.message }];
      },
    });
    this.subscription.push(sub);
  }

  validationChecker(): boolean {
    if (this.verifyForm.invalid) {
      this.messages = [{ severity: 'error', detail: 'Please check your data' }];
      return false;
    }
    return true;
  }
  verify() {
    this.submitted = true;
    if (!this.validationChecker()) return;
    this.loading = true;
    let data: Verify = {
      resetCode: this.f_verify.resetCode.value!,
    };
    let sub = this._AuthApiService.verifyCode(data).subscribe({
      next: (res) => {
        if (res.status === 'Success') {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Verified Successfully',
          });
          setTimeout(() => {
            this.submitted = false;
            this.loading = false;
            this.route.navigate(['/set-password']);
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
