/**
 * Created by rodrrap on 19/01/2017.
 */
import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardPageComponent} from "../pages/dashboard/dashboard-page.component";
import {DashboardFetNoHPC1Component} from "../pages/fet-ria-nohpc-1/dashboard-fet-nohpc1.component";
import {DashboardFetNoHPC2Component} from "../pages/fet-ria-nohpc-2/dashboard-fet-nohpc2.component";

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  component: DashboardPageComponent
}, {
  path: 'page1',
  pathMatch: 'full',
  component: DashboardFetNoHPC1Component
}, {
  path: 'page2',
  pathMatch: 'full',
  component: DashboardFetNoHPC2Component
}];
@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
