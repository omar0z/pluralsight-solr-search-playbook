import {BrowserModule} from '@angular/platform-browser';
import {NgModule, APP_INITIALIZER} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import 'hammerjs';

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./modules/app-routing.module";
import {AppMaterialModule} from "./modules/app-material.module";
import {AppService} from "./app.service";
import {FoamTreeClusteringComponent} from "./shared/foamtree/foamtree.component";
import {SearchBarComponent} from "./shared/searchbar/searchbar.component";
import {DashboardFetNoHPC1Component} from "./pages/fet-ria-nohpc-1/dashboard-fet-nohpc1.component";
import {DashboardFetNoHPC2Component} from "./pages/fet-ria-nohpc-2/dashboard-fet-nohpc2.component";
import {ClusterDataService} from "./shared/cluster-data.service";
import {DashboardFetComponent} from "./pages/fet-ria/dashboard-fet.component";
import {DocumentComponent} from "./shared/document/document.component";
import {ClusteringCacheService} from './shared/cache/clustering-cache.service';
import {ClusteringCacheInterceptor} from "./shared/cache/clustering-cache.interceptor";
import { DataResolverService } from './data-resolver.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardFetNoHPC1Component,
    DashboardFetNoHPC2Component,
    DashboardFetComponent,
    FoamTreeClusteringComponent,
    SearchBarComponent,
    DocumentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    AppRoutingModule,
    AppMaterialModule
  ],
  providers: [AppService, ClusterDataService, ClusteringCacheService, {provide: HTTP_INTERCEPTORS, useClass: ClusteringCacheInterceptor, multi: true}, DataResolverService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
