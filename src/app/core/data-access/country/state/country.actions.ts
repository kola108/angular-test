import { createAction, props } from '@ngrx/store';
import { Country } from '../../../../shared/enums/country';

const prefix = '[Country]';

const getCountries = createAction(
  `${prefix} Get Countries`
)

const getBackEndCountries = createAction(
  `${prefix} Get Back End Countries`
)

const loadCountriesSuccess = createAction(
  `${prefix} Load Countries Success`,
  props<{ countries: Country[] }>()
)

const loadCountriesFailure = createAction(
  `${prefix} Load Countries Failure`,
  props<{ error: string }>()
)

export const CountryActions = {
  getCountries,
  getBackEndCountries,
  loadCountriesSuccess,
  loadCountriesFailure
}
