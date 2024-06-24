import { createFeature, createReducer, on } from '@ngrx/store';
import { Country } from '../../../../shared/enums/country';
import { CountryActions } from './country.actions';

export interface CountryState {
  countries: Country[],
  loaded: boolean,
}

export const initialState: CountryState = {
  countries: [],
  loaded: false,
}

export const countryReducer = createReducer(
  initialState,

  on(CountryActions.getBackEndCountries, (state) => {
    return {
      ...state,
      loaded: false,
    }
  }),

  on(CountryActions.loadCountriesSuccess, (state, { countries }) => {
    return {
      ...state,
      countries,
      loaded: true
    };
  }),

  on(CountryActions.loadCountriesFailure, (state) => {
    return {
      ...state,
      loaded: false
    };
  }),
)

export const countryFeature = createFeature({
  name: 'country',
  reducer: countryReducer,
})
