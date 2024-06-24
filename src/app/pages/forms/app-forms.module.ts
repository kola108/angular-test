import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { CountriesDropdownComponent } from '../../shared/components/countries-dropdown/countries-dropdown.component';
import { TimePipe } from '../../shared/pipes/time.pipe';
import { TooltipDirective } from '../../shared/directives/tooltip.directive';
import { PagesRoutingModule } from '../pages-routing.module';
import { FormsContainerComponent } from './containers/forms-container/forms-container.component';
import { AppFormsRoutingModule } from './app-forms-routing.module';
import { FormsHeaderComponent } from './components/forms-header/forms-header.component';
import { FormsPlaceholderComponent } from './components/forms-placeholder/forms-placeholder.component';
import { FormsFormComponent } from './components/forms-form/forms-form.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    AppFormsRoutingModule,
    CountriesDropdownComponent,
    TimePipe,
    TooltipDirective,
    PagesRoutingModule
  ],
  declarations: [FormsContainerComponent, FormsHeaderComponent, FormsPlaceholderComponent, FormsFormComponent]
})
export class AppFormsModule { }
