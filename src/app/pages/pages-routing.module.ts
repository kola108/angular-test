import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'forms',
        loadChildren: () => import('./forms/app-forms.module').then(m => m.AppFormsModule),
      },
      // here other pages can be added
      /*
       {
        path: 'tables',
        loadChildren: () => import('./tables/app-tables.module').then(m => m.AppTablesModule),
      }
      */
      { path: '', redirectTo: 'forms', pathMatch: 'full' },
    ],
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
