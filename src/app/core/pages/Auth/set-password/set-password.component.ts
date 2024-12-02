import { Component, OnInit } from '@angular/core';
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
import { Router, RouterModule } from '@angular/router';
import { SetPassword, SetPasswordForm } from '../../../interfaces/set-password';
import { Message, MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-set-password',
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
  templateUrl: './set-password.component.html',
  styleUrl: './set-password.component.scss',
  providers: [MessageService],
})
export class SetPasswordComponent {
  setPasswordForm!: FormGroup<SetPasswordForm>;
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
    this.initSetPasswordForm();
  }

  initSetPasswordForm(): void {
    this.setPasswordForm = new FormGroup<SetPasswordForm>({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ]),
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/),
      ]),
    });
  }

  get f_setPassword(): SetPasswordForm {
    return this.setPasswordForm.controls;
  }

  validationChecker(): boolean {
    if (this.setPasswordForm.invalid) {
      this.messages = [{ severity: 'error', detail: 'Please check your data' }];
      return false;
    }
    return true;
  }

  signin() {
    this.submitted = true;
    if (!this.validationChecker()) return;
    this.loading = true;
    let data: SetPassword = {
      email: this.f_setPassword.email.value!,
      newPassword: this.f_setPassword.newPassword.value!,
    };
    this._AuthApiService.resetPassword(data).subscribe({
      next: (res) => {
        if (res.message === 'success') {
          this.submitted = false;
          this.loading = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Password Changed Successfully',
          });
          setTimeout(() => {
            this.route.navigate(['/']);
          }, 3000);
        }
      },
      error: (err) => {
        this.loading = false;
        this.messages = [{ severity: 'error', detail: err?.error?.message }];
      },
    });
  }
}
