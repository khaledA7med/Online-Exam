import { FormControl } from '@angular/forms';

export interface SetPasswordForm {
  password: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
}
export interface SetPassword {
  password: string;
  confirmPassword: string;
}
