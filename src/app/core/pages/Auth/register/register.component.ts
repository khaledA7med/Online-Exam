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
import { Register, RegisterForm } from '../../../interfaces/register';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ButtonModule,
    PasswordModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup<RegisterForm>;

  constructor(private _AuthApiService: AuthApiService) {}

  ngOnInit(): void {
    this.initRegisterForm();
  }

  initRegisterForm(): void {
    this.registerForm = new FormGroup<RegisterForm>({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
    });
  }

  get f_register(): RegisterForm {
    return this.registerForm.controls;
  }

  signup() {
    let data: Register = {
      firstName: this.f_register.email.value!,
      lastName: this.f_register.email.value!,
      email: this.f_register.email.value!,
      password: this.f_register.password.value!,
      confirmPassword: this.f_register.password.value!,
    };
    this._AuthApiService.register(data).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    });
  }
}
