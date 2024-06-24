import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { FormValues } from '../interfaces/form';

export class CustomValidators {
  static country(countries: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      return countries.includes(value) ? null : { country: 'Invalid country' };
    }
  }

  static birthday(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value as FormValues['birthday'];
      const date = new Date(value.year, value.month - 1, value.day);
      const now = new Date();

      return date < now ? null : { birthday: 'Invalid birthday' };
    }
  }
}
