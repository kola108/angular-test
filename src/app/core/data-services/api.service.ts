import { HttpClient } from '@angular/common/http';
import { Country } from '../../shared/enums/country';
import { Observable } from 'rxjs';
import {
  ValidateCountryResponse,
  SubmitFormResponse,
  ValidateUserNameResponse,
  GetCountryListResponse
} from '../../shared/interfaces/responses';
import { Injectable } from '@angular/core';
import { CountryRequest, UserNameRequest } from '../../shared/interfaces/requests';
import { FormValues } from '../../shared/interfaces/form';

@Injectable({providedIn: 'root'})
export class ApiService {
  private readonly baseUrl = '/api/';

  constructor(private http: HttpClient) { }

  validateCountry(country: Country): Observable<ValidateCountryResponse> {
    return this.post('regions', { country } as CountryRequest);
  }

  validateUsername(username: string): Observable<ValidateUserNameResponse> {
    return this.post('checkUsername', { username } as UserNameRequest);
  }

  submitForm(formValues: FormValues): Observable<SubmitFormResponse> {
    return this.post('submitForm', formValues);
  }

  getCountryList(): Observable<GetCountryListResponse> {
    return this.get('countries');
  }


  private get(url: string) {
    return this.http.get(this.baseUrl + url) as Observable<any>;
  }

  private post(url: string, body: any) {
    return this.http.post(this.baseUrl + url, body) as Observable<any>;
  }
}
