import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';
import { ValidateCountryResponse, ValidateUserNameResponse } from '../interfaces/responses';
import { ApiService } from '../../core/data-services/api.service';

export class AsyncCustomValidators {
  static country(apiService: ApiService): AsyncValidatorFn  {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }

      return apiService.validateCountry(control.value).pipe(
        map((response: ValidateCountryResponse) => response.region
          ? null
          : { country: 'Invalid country' }
        ),
        catchError(() => of({ country: 'Invalid country' }))
      )
    }
  }

  static userName(apiService: ApiService): AsyncValidatorFn  {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }

      return apiService.validateUsername(control.value).pipe(
        map((response: ValidateUserNameResponse) => response.isAvailable
          ? null
          : { userName: 'Invalid user name' }
        ),
        catchError(() => of({ userName: 'Invalid user name' }))
      )
    }
  }
}
