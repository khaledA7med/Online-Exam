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
import { Router, RouterModule } from '@angular/router';
import { Verify, VerifyForm } from '../../../interfaces/verify';
import { Message, MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-verify',
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
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.scss',
  providers: [MessageService],
})
export class VerifyComponent {
  verifyForm!: FormGroup<VerifyForm>;
  messages!: Message[];

  constructor(
    private _AuthApiService: AuthApiService,
    private messageService: MessageService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.initVerifyForm();
  }

  initVerifyForm(): void {
    this.verifyForm = new FormGroup<VerifyForm>({
      resetCode: new FormControl(''),
    });
  }

  get f_verify(): VerifyForm {
    return this.verifyForm.controls;
  }

  resendCode() {}

  verify() {
    let data: Verify = {
      resetCode: this.f_verify.resetCode.value!,
    };
    this._AuthApiService.verifyCode(data).subscribe({
      next: (res) => {
        if (res.status === 'Success') {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Verified Successfully',
          });
          setTimeout(() => {
            this.route.navigate(['/set-password']);
          }, 3000);
        }
      },
      error: (err) =>
        (this.messages = [{ severity: 'error', detail: err?.error?.message }]),
    });
  }
}
