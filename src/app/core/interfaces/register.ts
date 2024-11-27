import { FormControl } from '@angular/forms';

export interface RegisterForm {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
}
export interface Register {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
