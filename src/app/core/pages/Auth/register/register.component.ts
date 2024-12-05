import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthApiService } from 'auth-api';
import { Register, RegisterForm } from '../../../interfaces/register';
import { Message, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedModule } from '../../../../shared/components/ui/shared/shared.module';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm!: FormGroup<RegisterForm>;
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
    this.initRegisterForm();
  }

  //#region init form
  initRegisterForm(): void {
    this.registerForm = new FormGroup<RegisterForm>(
      {
        username: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(25),
          Validators.pattern(/^[A-Za-z]+$/),
        ]),
        firstName: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[A-Za-z]+$/),
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[A-Za-z]+$/),
        ]),
        phone: new FormControl('', [
          Validators.required,
          Validators.pattern(/^(010|011|012|015)\d{8}$/),
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          ),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
          ),
        ]),
        rePassword: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
          ),
        ]),
      },
      { validators: this.matchPasswords('password', 'rePassword') }
    );
  }

  get f_register(): RegisterForm {
    return this.registerForm.controls;
  }
  //#endregion

  //#region Validtion checkers
  matchPasswords(
    controlName: string,
    matchingControlName: string
  ): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const control = group.get(controlName);
      const matchingControl = group.get(matchingControlName);

      if (
        matchingControl?.errors &&
        !matchingControl.errors['passwordMismatch']
      ) {
        // return if another validator has already found an error on the matchingControl
        return null;
      }

      // check if the passwords match
      if (control?.value !== matchingControl?.value) {
        matchingControl?.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      } else {
        matchingControl?.setErrors(null);
        return null;
      }
    };
  }

  validationChecker(): boolean {
    if (this.registerForm.invalid) {
      this.messages = [{ severity: 'error', detail: 'Please check your data' }];
      return false;
    }
    return true;
  }
  //#endregion

  //#region submit form
  signup() {
    this.submitted = true;
    if (!this.validationChecker()) return;
    this.loading = true;
    let data: Register = {
      username: this.f_register.username.value!,
      firstName: this.f_register.firstName.value!,
      lastName: this.f_register.lastName.value!,
      phone: this.f_register.phone.value!,
      email: this.f_register.email.value!,
      password: this.f_register.password.value!,
      rePassword: this.f_register.rePassword.value!,
    };
    let sub = this._AuthApiService.register(data).subscribe({
      next: (res) => {
        if (res.message === 'success') {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Account Created Successfully',
          });
          setTimeout(() => {
            this.submitted = false;
            this.loading = false;
            this.route.navigate(['/']);
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
