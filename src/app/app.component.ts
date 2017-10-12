import { Component } from '@angular/core';
import {ObservableMedia, MediaChange} from "@angular/flex-layout";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public watcher: Subscription;
  public activeMediaQuery = "";
  public showMenu = false;

  constructor(private media: ObservableMedia) {
    this.watcher = media.subscribe((change: MediaChange) => {
      this.activeMediaQuery = change.mqAlias;
      if ( this.activeMediaQuery == 'xs' || this.activeMediaQuery == 'sm') {
        this.showMenu = false;
      }else{
        //this.showMenu = true;
      }
    });
  }

  public onMenuClick(){
    this.showMenu = !this.showMenu;
  }

}
