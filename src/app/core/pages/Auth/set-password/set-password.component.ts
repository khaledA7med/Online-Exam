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
import { RouterModule } from '@angular/router';
import { SetPassword, SetPasswordForm } from '../../../interfaces/set-password';

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
  ],
  templateUrl: './set-password.component.html',
  styleUrl: './set-password.component.scss',
})
export class SetPasswordComponent {
  setPasswordForm!: FormGroup<SetPasswordForm>;

  constructor(private _AuthApiService: AuthApiService) {}

  ngOnInit(): void {
    this.initSetPasswordForm();
  }

  initSetPasswordForm(): void {
    this.setPasswordForm = new FormGroup<SetPasswordForm>({
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
    });
  }

  get f_setPassword(): SetPasswordForm {
    return this.setPasswordForm.controls;
  }

  signin() {
    let data: SetPassword = {
      password: this.f_setPassword.password.value!,
      confirmPassword: this.f_setPassword.confirmPassword.value!,
    };
    this._AuthApiService.changePassword(data).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    });
  }
}
