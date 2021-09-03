import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditCountryComponent } from './edit-country.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: ':country', component: EditCountryComponent}
]

@NgModule({
  declarations: [EditCountryComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes), ReactiveFormsModule
  ]
})
export class EditCountryModule { }
