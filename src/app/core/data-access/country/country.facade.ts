import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCountries, selectLoaded } from './state/country.selectors';
import { CountryActions } from './state/country.actions';
import { Observable } from 'rxjs';
import { Country } from '../../../shared/enums/country';

@Injectable({ providedIn: 'root' })
export class CountryFacade {
  loaded$ = this.store.select(selectLoaded);
  countries$ = this.store.select(selectCountries);

  constructor(private store: Store) {}

  getCountries(): Observable<Country[]> {
    this.store.dispatch(CountryActions.getCountries());
    return this.countries$;
  }

  getBackEndCountries(): Observable<Country[]> {
    this.store.dispatch(CountryActions.getBackEndCountries());
    return this.countries$;
  }
}
