/**
 * Created by perezom on 29/09/2017.
 */
import { Component, EventEmitter, Output } from "@angular/core";

import { FormControl } from "@angular/forms";

import {debounceTime} from "rxjs/operators/debounceTime";
import {distinctUntilChanged} from "rxjs/operators/distinctUntilChanged";

/**
 * Created by perezom on 25/09/2017.
 */

@Component({
  selector: "search",
  templateUrl: "./searchbar.component.html",
})
export class SearchBarComponent {
  public queryString: string;
  public term: FormControl = new FormControl();

  @Output() onkeyStroke: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.term.valueChanges.pipe(
      debounceTime(800),
      distinctUntilChanged()
    ).subscribe(term => {
        this.queryString = term;
        this.onkeyStroke.emit(term)
      });
  }

  onClick() {
    if (!this.queryString || this.queryString === "") {
      this.queryString = "*";
    }
    this.onkeyStroke.emit(this.queryString);
  }
}
