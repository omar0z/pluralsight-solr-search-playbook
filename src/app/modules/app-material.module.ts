/**
 * Created by rodrrap on 19/01/2017.
 */
import {NgModule} from '@angular/core';

import {
  MdIconModule
  , MdButtonModule
  , MdListModule
  , MdToolbarModule
  , MdTooltipModule
  , MdCardModule
  , MdProgressSpinnerModule
  , MdInputModule, MdPaginatorModule, MdChipsModule, MdDatepickerModule, MdNativeDateModule, MdSelectModule
} from "@angular/material";

import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  imports: [],
  exports: [
    BrowserAnimationsModule,
    MdIconModule,
    MdButtonModule,
    MdListModule,
    MdToolbarModule,
    MdTooltipModule,
    MdCardModule,
    MdProgressSpinnerModule,
    MdInputModule,
    MdPaginatorModule,
    MdChipsModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdSelectModule,
    MdProgressSpinnerModule
  ]
})
export class AppMaterialModule {
}
