import { Country } from '../enums/country';

export interface FormValues {
  country: Country | string;
  userName: string;
  birthday: {
    year: number,
    month: number,
    day: number,
  };
}
