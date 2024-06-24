import { Country } from '../enums/country';

export interface ValidateCountryResponse {
  region: string;
}

export interface ValidateUserNameResponse {
  isAvailable: boolean;
}

export interface SubmitFormResponse {
  result: string;
}

export interface GetCountryListResponse {
  countries: Country[];
}
