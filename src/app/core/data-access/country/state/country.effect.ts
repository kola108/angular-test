import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../../data-services/api.service';
import { CountryActions } from './country.actions';
import { catchError, exhaustMap, filter, map, of, switchMap, tap } from 'rxjs';
import { CountryFacade } from '../country.facade';
import { GetCountryListResponse } from '../../../../shared/interfaces/responses';

@Injectable()
export class CountryEffects {
  fetchCountries$ = createEffect(() => this.actions$.pipe(
    ofType(CountryActions.getCountries),
    exhaustMap(() => this.countryFacade.loaded$),
    filter(loaded => !loaded),
    map(() => CountryActions.getBackEndCountries())
  ))

  getBackEndCountries$ = createEffect(() => this.actions$.pipe(
    ofType(CountryActions.getBackEndCountries),
    exhaustMap(() => this.apiService.getCountryList().pipe(
      map((response: GetCountryListResponse) => CountryActions.loadCountriesSuccess({ countries: response.countries })),
      catchError((error: Error) => of(CountryActions.loadCountriesFailure({ error: error.message })))
    ))
  ))


  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private countryFacade: CountryFacade,
  ) {}
}
