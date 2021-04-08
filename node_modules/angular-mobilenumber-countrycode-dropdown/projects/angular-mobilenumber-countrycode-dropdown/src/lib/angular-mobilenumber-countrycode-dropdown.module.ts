import { NgModule } from '@angular/core';
import { AngularMobilenumberCountrycodeDropdownComponent } from './angular-mobilenumber-countrycode-dropdown.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HttpClientTestingModule} from '@angular/common/http/testing';

@NgModule({
  declarations: [AngularMobilenumberCountrycodeDropdownComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule, HttpClientTestingModule
  ],
  exports: [AngularMobilenumberCountrycodeDropdownComponent]
})
export class AngularMobilenumberCountrycodeDropdownModule { }
