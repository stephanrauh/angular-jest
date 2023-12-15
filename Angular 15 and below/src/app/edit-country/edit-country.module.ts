import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditCountryComponent } from './edit-country.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

const routes: Routes = [{ path: ':country', component: EditCountryComponent }];

@NgModule({
  declarations: [EditCountryComponent],
  providers: [ConfirmationService],
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule, ConfirmDialogModule, InputTextModule, ButtonModule],
})
export class EditCountryModule {}
