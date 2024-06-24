import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-forms-header',
  templateUrl: './forms-header.component.html',
  styleUrl: './forms-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormsHeaderComponent {
  @Input() submitDisabled = true;
  @Input() isFormSubmitting = false;
  @Input() remainingTime = 0;

  @Output() submitEvent = new EventEmitter<void>();
  @Output() cancelEvent = new EventEmitter<void>();

  onSubmit() {
    this.submitEvent.emit();
  }

  onCancel() {
    this.cancelEvent.emit();
  }
}
