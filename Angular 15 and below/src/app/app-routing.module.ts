import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'country', loadChildren: () => import('./edit-country/edit-country.module').then(m => m.EditCountryModule)},
  {path: '**', redirectTo: "country/Spain"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
