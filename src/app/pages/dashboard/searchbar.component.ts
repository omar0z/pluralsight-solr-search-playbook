/**
 * Created by perezom on 29/09/2017.
 */
import {
  Component, Input, HostListener, OnDestroy, OnInit, EventEmitter, Output, Injectable, NgZone, ApplicationRef
} from "@angular/core";

import { FormControl } from '@angular/forms';



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

  private term: FormControl = new FormControl();

  @Output()
  onkeyStroke: EventEmitter<any> = new EventEmitter();


  constructor() {
    this.term.valueChanges
    .debounceTime(800)
    .distinctUntilChanged()
    .subscribe(term => this.onkeyStroke.emit(term));
  }


  onClick() {
    console.log("this.queryString: ", this.queryString);

    if (this.queryString || this.queryString === "") {
      this.queryString = "*";
    }
    this.onkeyStroke.emit(this.queryString)
  }

}
