import { FormControl } from '@angular/forms';

export interface VerifyForm {
  code: FormControl<string | null>;
}
export interface Verify {
  code: string;
}
