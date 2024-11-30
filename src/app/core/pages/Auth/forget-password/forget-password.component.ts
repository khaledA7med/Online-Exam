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
import {
  ForgetPassword,
  ForgetPasswordForm,
} from '../../../interfaces/forget-password';
import { Message, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { MessagesModule } from 'primeng/messages';

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
export class ForgetPasswordComponent {
  forgetPasswordForm!: FormGroup<ForgetPasswordForm>;
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
    this.forgetPasswordForm = new FormGroup<ForgetPasswordForm>({
      email: new FormControl(''),
    });
  }

  get f_forgetPassword(): ForgetPasswordForm {
    return this.forgetPasswordForm.controls;
  }

  forgetPassword() {
    let data: ForgetPassword = {
      email: this.f_forgetPassword.email.value!,
    };
    this._AuthApiService.forgetPassword(data).subscribe({
      next: (res) => {
        if (res.message === 'success') {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: res.info,
          });
          setTimeout(() => {
            this.route.navigate(['/verify-code']);
          }, 3000);
        }
      },
      error: (err) =>
        (this.messages = [{ severity: 'error', detail: err?.error?.message }]),
    });
  }
}
