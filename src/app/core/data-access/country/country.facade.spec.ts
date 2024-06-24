import { StoreModule } from '@ngrx/store';
import { MockBuilder, MockService, ngMocks } from 'ng-mocks';
import { CountryFacade } from './country.facade';
import { EffectsModule } from '@ngrx/effects';
import { countryReducer } from './state/country.reducer';
import { CountryEffects } from './state/country.effect';
import { ApiService } from '../../data-services/api.service';
import { of } from 'rxjs';
import { GetCountryListResponse } from '../../../shared/interfaces/responses';

describe('CountryFacade', () => {
  let facade: CountryFacade;

  const countries = [ 'USA', 'Canada'];

  beforeEach(() => {
    return MockBuilder([
      CountryFacade,
      StoreModule.forRoot({
        country: countryReducer,
      }),
      EffectsModule.forRoot(CountryEffects),
    ])
    .mock(ApiService, {
      getCountryList: () => of({ countries } as GetCountryListResponse),
    })
  });

  beforeEach(() => {
    facade = ngMocks.findInstance(CountryFacade);
  });

  it('should be created', () => {
    expect(facade).toBeDefined();
  });
})
