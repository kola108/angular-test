import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsContainerComponent } from './containers/forms-container/forms-container.component';

const routes: Routes = [
  {
    path: '',
    component: FormsContainerComponent,
  },
  {
    path: '**',
    component: FormsContainerComponent,
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppFormsRoutingModule {}
