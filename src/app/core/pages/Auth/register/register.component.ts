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
import { MessagesModule } from 'primeng/messages';
import { Register, RegisterForm } from '../../../interfaces/register';
import { Message, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

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
    MessagesModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [MessageService],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup<RegisterForm>;
  messages!: Message[];

  constructor(
    private _AuthApiService: AuthApiService,
    private messageService: MessageService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.initRegisterForm();
  }

  initRegisterForm(): void {
    this.registerForm = new FormGroup<RegisterForm>({
      username: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      rePassword: new FormControl(''),
    });
  }

  get f_register(): RegisterForm {
    return this.registerForm.controls;
  }

  signup() {
    let data: Register = {
      username: this.f_register.username.value!,
      firstName: this.f_register.firstName.value!,
      lastName: this.f_register.lastName.value!,
      phone: this.f_register.phone.value!,
      email: this.f_register.email.value!,
      password: this.f_register.password.value!,
      rePassword: this.f_register.rePassword.value!,
    };
    this._AuthApiService.register(data).subscribe({
      next: (res) => {
        if (res.message === 'success') {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Account Created Successfully',
          });
          setTimeout(() => {
            this.route.navigate(['/']);
          }, 3000);
        }
        console.log(res.message);
      },
      error: (err) => {
        this.messages = [{ severity: 'error', detail: err?.error?.message }];
      },
    });
  }
}
