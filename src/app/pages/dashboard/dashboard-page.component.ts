import {Component, OnInit, EventEmitter} from '@angular/core';
import {AppService} from "../../app.service";
import {Subject} from "rxjs";

import * as _ from "lodash";
import {Output} from "@angular/core";

@Component({
  selector: 'dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {

  public documents: Array<any>;
  public documentsOnDisplay: Array<any>;
  public clusters: Array<any>;
  public queryString: String;
  public subject: Subject<Array<any>>;

  @Output()
  clusterOnHover: EventEmitter<Object> = new EventEmitter();


  constructor(public service: AppService) {
    this.documents = new Array();
    this.documentsOnDisplay = new Array();
    this.clusters = new Array();
    this.queryString = "";
    this.subject = new Subject();
  }


  public ngOnInit() {
    this.getData();
  }

  public getData() {
    this.service.getDataFirstCore(this.queryString).subscribe(result => {
      const object = result.json();
      this.queryString = "";
      this.documents = object.response.docs;
      this.documentsOnDisplay = object.response.docs;
      this.clusters = this.adaptKeysToFoamTreeFormat(object.clusters);
      this.notifyChildren();
    });
  }

  notifyChildren() {
    this.subject.next(this.clusters);
  }

  adaptKeysToFoamTreeFormat(clusterArray: Array<any>): Array<any> {
    const targetArray: Array<any> = new Array();
    if (clusterArray) {
      for (const object of clusterArray) {
        const targetObject = {
          label: object.labels[0],
          weight: object.score,
          docs: object.docs,
          groups: this.adaptKeysToFoamTreeFormat(object.clusters)
        }
        targetArray.push(targetObject);
      }
    }
    return targetArray;
  }

  getSelectedCluster(data: any) {
    if (data && data.groups[0]) {
      const clusterDocIds = data.groups[0].docs;
      this.documentsOnDisplay = _.filter(this.documents, function (object) {
        return clusterDocIds.includes(object.id);
      })
    }

  }

  emitClusterHover(data) {
    this.clusterOnHover.emit(data);
  }

  search(data: string) {
    this.queryString = data;
    this.getData();
  }

}
