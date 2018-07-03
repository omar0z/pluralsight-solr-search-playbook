/**
 * Created by rodrrap on 19/01/2017.
 */
import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardFetNoHPC1Component} from "../pages/fet-ria-nohpc-1/dashboard-fet-nohpc1.component";
import {DashboardFetNoHPC2Component} from "../pages/fet-ria-nohpc-2/dashboard-fet-nohpc2.component";
import {DataResolverService} from "../data-resolver.service";

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  component: DashboardFetNoHPC1Component,
  resolve: {data: DataResolverService},
  data: {flag: true}
}, {
  path: 'page1',
  pathMatch: 'full',
  component: DashboardFetNoHPC1Component,
  resolve: {data: DataResolverService},
  data: {flag: true}
}, {
  path: 'page2',
  pathMatch: 'full',
  component: DashboardFetNoHPC2Component,
  resolve: {data: DataResolverService},
  data: {flag: false}
}];
@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
