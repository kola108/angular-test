import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-forms-placeholder',
  templateUrl: './forms-placeholder.component.html',
  styleUrl: './forms-placeholder.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormsPlaceholderComponent {
  @Input() isFormAddAvailable = false;

  @Output() addFormEvent = new EventEmitter();

  addForm() {
    this.addFormEvent.emit();
  }
}
