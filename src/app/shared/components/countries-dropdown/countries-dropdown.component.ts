import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { NgbDropdown, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EventEmitter } from '@angular/core';
import { debounceTime, tap } from 'rxjs';
import { TooltipDirective } from '../../directives/tooltip.directive';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-countries-dropdown',
  standalone: true,
  imports: [ReactiveFormsModule, TooltipDirective, CommonModule, NgbModule],
  templateUrl: './countries-dropdown.component.html',
  styleUrl: './countries-dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountriesDropdownComponent implements AfterViewInit {
  @ViewChild('countryDropdown') countryDropdown: NgbDropdown | undefined;
  @Input() set control(control: FormControl) {
    this.formControl = control;
    this.formGroup = control?.parent as FormGroup;
  };
  @Input() set countries(countries: string[]) {
    this.existingCountries = countries;
    this.filteredCountries = countries;
  }
  @Input() tooltipText = '';

  @Output() countrySelectEvent = new EventEmitter<string>();

  formGroup!: FormGroup;
  formControl!: FormControl;
  existingCountries: string[] = [];
  filteredCountries: string[] = [];

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.formControl.valueChanges.pipe(
      debounceTime(300),
      untilDestroyed(this),
      tap((country: string) => {
        if (country) {
          this.countryDropdown?.open();
          this.filteredCountries = this.existingCountries
            .filter((existingCountry: string) => existingCountry.toLowerCase().includes(country.toLowerCase()));
        } else {
          this.closeDropdown()
        }
        this.changeDetectorRef.detectChanges();
      })
    ).subscribe()
  }

  onCountrySelect(country: string) {
    this.formControl.setValue(country, { emitEvent: false });
    this.closeDropdown();
    this.countrySelectEvent.emit(country);
  }

  private closeDropdown() {
    this.countryDropdown?.close();
    this.filteredCountries = this.existingCountries;
  }
}
