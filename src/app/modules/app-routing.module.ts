import { GlobomanticsComponent } from './../pages/globomantics/globomantics.component';
/**
 * Created by rodrrap on 19/01/2017.
 */
import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DataResolverService} from "../data-resolver.service";

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  component: GlobomanticsComponent,
  resolve: {data: DataResolverService},
  data: {flag: true}
}, {
  path: 'page1',
  pathMatch: 'full',
  component: GlobomanticsComponent,
  resolve: {data: DataResolverService},
  data: {flag: true}
}];
@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
