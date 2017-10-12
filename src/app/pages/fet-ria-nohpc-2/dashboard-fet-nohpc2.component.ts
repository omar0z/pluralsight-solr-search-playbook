import {Component, OnInit} from '@angular/core';
import {AppService} from "../../app.service";
import {Subject} from "rxjs";

import * as _ from "lodash";

@Component({
  selector: 'fet-nohpc2-page',
  templateUrl: './dashboard-fet-nohpc2.component.html',
  styleUrls:['./dashboard-fet-nohpc2.component.css']
})
export class DashboardFetNoHPC2Component implements OnInit {

  private documents: Array<any>;
  private documentsOnDisplay: Array<any>;
  private clusters: Array<any>;
  private queryString: String;
  private subject: Subject<Array<any>>;



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
    this.service.getDataThirdCore(this.queryString).subscribe(result => {
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
    for (const object of clusterArray) {
      const targetObject = {
        label: object.labels[0],
        weight: object.score,
        docs: object.docs
      }
      targetArray.push(targetObject);
    }
    return targetArray;
  }

  getSelectedCluster(data: any) {
    if (data) {
      const clusterDocIds = data.groups[0].docs;
      this.documentsOnDisplay = _.filter(this.documents, function(object){
        return clusterDocIds.includes(object.id);
      })
    }

  }

  search(data: string) {
    this.queryString = data;
    this.getData();
  }

}
