/**
 * Created by rodrrap on 19/01/2017.
 */
import {NgModule} from '@angular/core';

import {
  MatIconModule
  , MatButtonModule
  , MatListModule
  , MatToolbarModule
  , MatTooltipModule
  , MatCardModule
  , MatProgressSpinnerModule
  , MatInputModule, MatPaginatorModule, MatChipsModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule
} from "@angular/material";

import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  imports: [],
  exports: [
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatToolbarModule,
    MatTooltipModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatPaginatorModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ]
})
export class AppMaterialModule {
}
