import {Component} from '@angular/core';
import {ObservableMedia, MediaChange} from "@angular/flex-layout";
import {Subscription} from "rxjs";
import {ClusterDataService} from "./shared/cluster-data.service";
import {Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Event} from "@angular/router";

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

  public loading: boolean = true;

  constructor(private media: ObservableMedia, private clusterService : ClusterDataService, private router: Router) {
    this.watcher = media.subscribe((change: MediaChange) => {
      this.activeMediaQuery = change.mqAlias;
      if ( this.activeMediaQuery == 'xs' || this.activeMediaQuery == 'sm') {
        this.showMenu = true;
      }else{
        //this.showMenu = true;
      }
    });

    router.events.subscribe((routerEvent: Event) => {
      this.checkRouterEvent(routerEvent);
    });

    this.clusterWatcher = this.clusterService.getCluster().subscribe(cluster => {this.clusterOnHover = cluster})
  }


  public onMenuClick(){
    this.showMenu = !this.showMenu;
  }


  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError) {
      this.loading = false;
    }
  }
}
