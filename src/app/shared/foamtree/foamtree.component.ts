import {
  Component, Input, HostListener, OnInit, EventEmitter, Output, OnChanges, SimpleChanges
} from "@angular/core";
import {ClusterDataService} from "../cluster-data.service";

/**
 * Created by perezom on 25/09/2017.
 */
declare var CarrotSearchFoamTree: any;

@Component({
  selector: 'clustering',
  templateUrl: './foamtree.component.html',
})
export class FoamTreeClusteringComponent implements OnInit, OnChanges {

  private foamtree: any;
  // private resizeTimeout: number;
  // private clusterClickFlag: boolean = true;


  @Input()
  public clusters: any;

  @Output()
  onClusterSelected: EventEmitter<any> = new EventEmitter();
  @Output()
  onClusterHover: EventEmitter<any> = new EventEmitter();


  constructor(private clusterService: ClusterDataService) {
    //console.log("*** constructor ***");
  }

  ngOnInit() {
    this.foamtreeSetup();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("changes: ", changes);
    this.clusters = changes.clusters.currentValue;
    this.foamtreeSetup();
  }

  //*********** Listeners **************

  @HostListener('window:resize')
  onWindowResize() {
    if (this.foamtree) {
      this.foamtree.resize();
    }
  }

  @HostListener('window:onGroupClick', ['$event'])
  onFoamtreeContainerClick(event) {
    const selectedCluster = event.detail.group;
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


  //****** Functions ******

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

  foamtreeSetup() {
    if (this.foamtree) {
      this.foamtree.dispose();
    }
    this.foamtree = new CarrotSearchFoamTree({
      id: 'foamtree',
      dataObject: {
        groups: this.clusters
      },
      onGroupHover: function (info) {
        window.dispatchEvent(new CustomEvent('onClusterHover', {detail: info}));
      },
      onGroupClick: function (group) {
        window.dispatchEvent(new CustomEvent('onGroupClick', {detail: group}));
        //We resize again so it doesn't freeze when a super cluster is clicked
        window.setTimeout(e => {
          this.resize();
        }, 0);
      }
    });
    //We resize here to prevent the component to freeze on click
    window.setTimeout(e => {
      this.foamtree.resize();
    }, 0);
  }
}
