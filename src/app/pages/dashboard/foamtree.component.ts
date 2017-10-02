import {
  Component, Input, HostListener, OnDestroy, OnInit, EventEmitter, Output, Injectable, NgZone, ApplicationRef
} from "@angular/core";
import {Subject} from "rxjs";

/**
 * Created by perezom on 25/09/2017.
 */
declare var CarrotSearchFoamTree: any;

@Component({
  selector: 'clustering',
  templateUrl: './foamtree.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class FoamTreeClusteringComponent implements OnInit, OnDestroy {

  private foamtree: any;
  private resizeTimeout: number;

  @Input()
  public subject: Subject<Array<any>>;
  @Output()
  onClusterSelected: EventEmitter<any> = new EventEmitter();


  constructor() {
    //this.onClusterSelected = new EventEmitter<any>();
  }

  ngOnInit() {
    this.subject.subscribe(event => {
      if (this.foamtree) {
        this.foamtree.dispose();
      }

      this.foamtree = new CarrotSearchFoamTree({
        id: 'foamtree',
        dataObject: {
          groups: event
        }
      });
    });
  }

  ngOnDestroy() {
    this.subject.unsubscribe();
  }

  @HostListener('window:resize')
  onWindowResize() {
    if (this.resizeTimeout) {
      this.resizeTimeout = 0;
    }
    if (this.foamtree) {
      this.resizeTimeout = setTimeout((() => {
        this.foamtree.resize();
      }).bind(this), 100);
    }
  }

  @HostListener('click')
  onFoamtreeContainerClick() {
    let selectedCluster = this.foamtree.get("selection");
    this.onClusterSelected.emit(selectedCluster);
  }



}
