import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Country } from '../../../../shared/enums/country';

@Component({
  selector: 'app-forms-form',
  templateUrl: './forms-form.component.html',
  styleUrl: './forms-form.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush, since the formGroup and formsArray as inputs, in this case we should not use OnPush
})
export class FormsFormComponent {
  @Input() formGroup!: FormGroup;
  @Input() formsArray!: any; // type any because typescript emits errors
  @Input() countries: Country[] = [];

  @Output() removeFormEvent = new EventEmitter<number>();

  removeForm(i: number) {
    this.removeFormEvent.emit(i);
  }

  getCountryControl(formGroup: any): FormControl {
    return formGroup.get('country') as FormControl;
  }
}
