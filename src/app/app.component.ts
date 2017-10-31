import { Component } from '@angular/core';
import {ObservableMedia, MediaChange} from "@angular/flex-layout";
import {Subscription} from "rxjs";
import {ClusterDataService} from "./shared/cluster-data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public watcher: Subscription;
  public activeMediaQuery = "";
  public showMenu = true;
  public clusterOnHover: any;
  public clusterWatcher: Subscription;

  constructor(private media: ObservableMedia, private clusterService : ClusterDataService) {
    this.watcher = media.subscribe((change: MediaChange) => {
      this.activeMediaQuery = change.mqAlias;
      if ( this.activeMediaQuery == 'xs' || this.activeMediaQuery == 'sm') {
        this.showMenu = true;
      }else{
        //this.showMenu = true;
      }
    });

    this.clusterWatcher = this.clusterService.getCluster().subscribe(cluster => {this.clusterOnHover = cluster})
  }

  public onMenuClick(){
    this.showMenu = !this.showMenu;
  }

}
