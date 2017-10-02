/**
 * Created by rodrrap on 19/01/2017.
 */
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardPageComponent} from "../pages/dashboard/dashboard-page.component";

const routes: Routes = [{
    path: '',
    pathMatch: 'full',
    component: DashboardPageComponent
  }];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {

}
