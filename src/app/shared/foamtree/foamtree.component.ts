import {
  Component, Input, HostListener, OnDestroy, OnInit, EventEmitter, Output
} from "@angular/core";
import {Subject} from "rxjs";
import {ClusterDataService} from "../cluster-data.service";

/**
 * Created by perezom on 25/09/2017.
 */
declare var CarrotSearchFoamTree: any;

@Component({
  selector: 'clustering',
  templateUrl: './foamtree.component.html',
})
export class FoamTreeClusteringComponent implements OnInit, OnDestroy {

  private foamtree: any;
  private resizeTimeout: number;

  @Input()
  public subject: Subject<Array<any>>;
  @Output()
  onClusterSelected: EventEmitter<any> = new EventEmitter();
  @Output()
  onClusterHover: EventEmitter<any> = new EventEmitter();


  constructor(private clusterService: ClusterDataService) {
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
        },
        onGroupHover: function (info) {
          window.dispatchEvent(new CustomEvent('onClusterHover', {detail: info}));
        }
      });
    });
  }

  ngOnDestroy() {
    this.subject.unsubscribe();
  }

  @HostListener('window:resize')
  onWindowResize() {
    if (this.foamtree) {
        this.foamtree.resize();
    }
  }

  @HostListener('click')
  onFoamtreeContainerClick() {
    const selectedCluster = this.foamtree.get("selection");
    if (selectedCluster) {
      this.onClusterSelected.emit(selectedCluster);
    }
  }

  @HostListener('window:onClusterHover', ['$event'])
  emitClusterOnHover(event) {
    let cluster = event.detail.group
    if (cluster && cluster.label) {
      cluster.nbOfDocs = this.calculateTotalDocs(cluster);
      this.clusterService.setCluster(cluster);
    }
  }

  calculateTotalDocs(clusterObj: any): number {
    if (clusterObj.groups.length == 0) {
      return clusterObj.docs.length;
    } else {
      let docs = 0;
      clusterObj.groups.forEach((group) => {
        docs += group.docs.length;
      });
      return docs;
    }

  }
}
