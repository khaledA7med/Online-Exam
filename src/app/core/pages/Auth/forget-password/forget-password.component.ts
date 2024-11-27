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
  ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent {
  forgetPasswordForm!: FormGroup<ForgetPasswordForm>;

  constructor(private _AuthApiService: AuthApiService) {}

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
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    });
  }
}
