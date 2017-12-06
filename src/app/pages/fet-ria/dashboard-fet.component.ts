import {Component, OnInit, Input} from '@angular/core';
import {AppService} from "../../app.service";
import {Subject} from "rxjs";

import * as _ from "lodash";
import {PageEvent} from "@angular/material";

@Component({
  selector: 'fet-page',
  templateUrl: './dashboard-fet.component.html',
  styleUrls: ['./dashboard-fet.component.css']
})
export class DashboardFetComponent implements OnInit {

  public documents: Array<any>;
  public documentsOnDisplay: Array<any>;
  public clusters: Array<any>;
  public queryString: String;
  public subject: Subject<Array<any>>;
  public initPaginator: PageEvent = new PageEvent();

  @Input()
  public dataFlag: boolean;


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
    this.service.getData(this.queryString, this.dataFlag).subscribe(result => {
      const object = result.json();
      this.queryString = "";
      this.documents = object.response.docs;
      this.documentsOnDisplay = object.response.docs;
      this.clusters = this.adaptKeysToFoamTreeFormat(object.clusters);
      this.initPaginator.length = this.documents.length;
      this.initPaginator.pageIndex = 0;
      this.initPaginator.pageSize = 10;
      this.onPaginateChange(this.initPaginator);
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
    if (data && data.groups) {
      const clusterDocIds = data.groups[0].docs;
      this.documentsOnDisplay = _.filter(this.documents, function (object) {
        return clusterDocIds.includes(object.id);
      })
    }

  }

  search(data: string) {
    this.queryString = data;
    this.getData();
  }

  onPaginateChange(event) {
    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    this.documentsOnDisplay = this.documents.slice(startIndex, endIndex);
    console.log(this.documentsOnDisplay);
    console.log(event);
  }

}
