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
import { RouterModule } from '@angular/router';
import { Verify, VerifyForm } from '../../../interfaces/verify';

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
  ],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.scss',
})
export class VerifyComponent {
  verifyForm!: FormGroup<VerifyForm>;

  constructor(private _AuthApiService: AuthApiService) {}

  ngOnInit(): void {
    this.initVerifyForm();
  }

  initVerifyForm(): void {
    this.verifyForm = new FormGroup<VerifyForm>({
      code: new FormControl(''),
    });
  }

  get f_verify(): VerifyForm {
    return this.verifyForm.controls;
  }

  resendCode() {}

  verify() {
    let data: Verify = {
      code: this.f_verify.code.value!,
    };
    this._AuthApiService.verifyCode(data).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    });
  }
}
