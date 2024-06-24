import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'forms',
        loadChildren: () => import('./forms/app-forms.module').then(m => m.AppFormsModule),
      }
      // here other pages can be added
      /*
       {
        path: 'tables',
        loadChildren: () => import('./tables/app-tables.module').then(m => m.AppTablesModule),
      }
      */
    ]
  },
  {path: '', redirectTo: 'forms', pathMatch: 'full'},
  {path: '**', redirectTo: 'forms'},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
