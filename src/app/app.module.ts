import { BrowserModule } from '@angular/platform-browser';
import {NgModule, APP_INITIALIZER} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./modules/app-routing.module";
import {AppMaterialModule} from "./modules/app-material.module";
import {AppService} from "./app.service";
import {FoamTreeClusteringComponent} from "./shared/foamtree/foamtree.component";
import {SearchBarComponent} from "./shared/searchbar/searchbar.component";
import {DashboardFetNoHPC1Component} from "./pages/fet-ria-nohpc-1/dashboard-fet-nohpc1.component";
import {DashboardFetNoHPC2Component} from "./pages/fet-ria-nohpc-2/dashboard-fet-nohpc2.component";
import {ClusterDataService} from "./shared/cluster-data.service";

@NgModule({
  declarations: [
    AppComponent,
    DashboardFetNoHPC1Component,
    DashboardFetNoHPC2Component,
    FoamTreeClusteringComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    FlexLayoutModule,
    AppRoutingModule,
    AppMaterialModule
  ],
  providers: [AppService, ClusterDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
