import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { BehaviorSubject, catchError, finalize, interval, map, Observable, Subscription, take, tap } from 'rxjs';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from '../../../../shared/enums/country';
import { ApiService } from '../../../../core/data-services/api.service';
import { CountryFacade } from '../../../../core/data-access/country/country.facade';
import { AsyncCustomValidators } from '../../../../shared/validators/async-custom-validators';
import { CustomValidators } from '../../../../shared/validators/custom-validators';
import { SubmitFormResponse } from '../../../../shared/interfaces/responses';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-forms-container',
  templateUrl: './forms-container.component.html',
  styleUrl: './forms-container.component.scss'
})
export class FormsContainerComponent implements AfterViewInit {
  private cancelTimer = 10; // 10 sec for user to cancel form submission
  private countdownSubscription: Subscription | undefined

  formGroup: FormGroup = this.fb.group({
    forms: this.fb.array([] as FormGroup[])
  });

  countries$: Observable<Country[]> = this.countryFacade.getCountries();
  remainingTime$ = new BehaviorSubject(this.cancelTimer);
  isFormSubmitting$ = new BehaviorSubject(false);
  isFormInvalid$ = this.formGroup.statusChanges.pipe(map( status => status === 'INVALID'));

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private countryFacade: CountryFacade,
    private changeDetector: ChangeDetectorRef
  ) {}

  get formsArray(): FormArray<FormGroup> {
    return this.formGroup.get('forms') as FormArray<FormGroup>;
  }

  ngAfterViewInit() {
    this.addForm();
    this.isFormSubmitting$.pipe(
      untilDestroyed(this),
      tap((isSubmitting) => isSubmitting ? this.formGroup.disable() : this.formGroup.enable())
    ).subscribe()
    this.changeDetector.detectChanges();
  }

  addForm() {
    this.isFormAddAvailable().pipe(
      take(1),
      tap((isAvailable) => {
        if (isAvailable) {
          this.formsArray.push(this.createForm());
        }
      })
    ).subscribe()
  }

  removeForm(index: number) {
    this.isFormSubmitting$.pipe(
      take(1),
      tap((isSubmitting) => {
        if (!isSubmitting) this.formsArray.removeAt(index);
      })
    ).subscribe()
  }

  onSubmit() {
    if(!this.formsArray?.length) return;

    this.formGroup.updateValueAndValidity();
    this.isFormSubmitting$.next(true);
    const countdown$ = interval(1000).pipe(
      take(this.cancelTimer),
      map(value => this.cancelTimer - value - 1)
    );

    this.countdownSubscription = countdown$.pipe(
      tap((time) => this.remainingTime$.next(time)),
      finalize(() => this.submitForm())
    ).subscribe();
  }

  onCancel() {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }
    this.isFormSubmitting$.next(false);
    this.remainingTime$.next(this.cancelTimer);
  }

  isFormAddAvailable(): Observable<boolean> {
    return this.isFormSubmitting$.pipe(
      map(isSubmitting => !isSubmitting && ((this.formsArray || []).length < 10))
    );
  }


  private createForm(): FormGroup {
    return this.fb.group({
      country: ['', Validators.required, AsyncCustomValidators.country(this.apiService)],
      userName: ['', Validators.required, AsyncCustomValidators.userName(this.apiService)],
      birthday: ['', [Validators.required, CustomValidators.birthday()]],
    });
  }

  private submitForm() {
    if (this.remainingTime$.value === 0 && this.formGroup.valid) {
      this.apiService.submitForm(this.formGroup.value).pipe(
        take(1),
        tap((response: SubmitFormResponse) => {
          alert(response.result);
          this.isFormSubmitting$.next(false);
          this.formGroup.reset();
        }),
        catchError((error) => {
          this.isFormSubmitting$.next(false);
          return error;
        })
      ).subscribe();
    }
  }
}
