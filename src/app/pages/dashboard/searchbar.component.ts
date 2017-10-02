/**
 * Created by perezom on 29/09/2017.
 */
import {
  Component, Input, HostListener, OnDestroy, OnInit, EventEmitter, Output, Injectable, NgZone, ApplicationRef
} from "@angular/core";


/**
 * Created by perezom on 25/09/2017.
 */


@Component({
  selector: 'search',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class SearchBarComponent {

  private queryString: string;
  private keyPressTimeout: number;

  @Output()
  onkeyStroke: EventEmitter<any> = new EventEmitter();


  constructor() {
  }

  @HostListener('document:keypress')
  onKeyPress() {
    if (this.keyPressTimeout) {
      this.keyPressTimeout = 0;
    }
    if (this.queryString) {
      this.keyPressTimeout = setTimeout((() => {
        this.onkeyStroke.emit(this.queryString)
      }).bind(this), 100);
    }
  }

  onClick() {
    console.log("this.queryString: ", this.queryString);

    if (this.queryString || this.queryString === "") {
      this.queryString = "*";
    }
    this.onkeyStroke.emit(this.queryString)
  }

}
