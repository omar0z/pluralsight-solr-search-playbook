import {Component, OnInit, Input} from '@angular/core';
import {AppService} from "../../app.service";
import {Subject} from "rxjs";

import * as _ from "lodash";
import {PageEvent} from "@angular/material";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'fet-page',
  templateUrl: './dashboard-fet.component.html',
  styleUrls: ['./dashboard-fet.component.css']
})
export class DashboardFetComponent implements OnInit {

  public documents: Array<any>;
  public filteredDocuments: Array<any>;
  public documentsOnDisplay: Array<any>;
  public clusters: Array<any>;
  public queryString: string;
  public dateString: string;
  public subject: Subject<Array<any>>;
  public initPaginator: PageEvent = new PageEvent();
  public deadlineDates = [];
  public selected: string;
  public isLoading: boolean = true;

  @Input()
  public dataFlag: boolean;

  // @Input()
  // public selectedDate: Subject<number>;


  constructor(public service: AppService) {
    this.documents = new Array();
    this.filteredDocuments = new Array();
    this.documentsOnDisplay = new Array();
    this.clusters = new Array();
    this.queryString = "";
    this.subject = new Subject();
  }


  public ngOnInit() {
    this.getData();
  }

  public getData() {
    const facetsField = (this.dataFlag) ? environment.sourceFacetsField2 : environment.sourceFacetsField1;
    this.service.getData(this.queryString, this.dataFlag, this.dateString).subscribe(result => {
      const object = result.json();
      console.log("object: ", object);
      this.transformDatesArray(object.facet_counts.facet_fields[facetsField]);
      this.queryString = "";
      this.documents = object.response.docs;
      this.filteredDocuments = object.response.docs;
      this.clusters = this.adaptKeysToFoamTreeFormat(object.clusters);
      this.initPaginator.length = this.documents.length;
      this.initPaginator.pageIndex = 0;
      this.initPaginator.pageSize = 10;
      this.onPaginateChange(this.initPaginator, this.filteredDocuments);

      this.notifyChildren();
      this.isLoading = false;
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
    if (data) {
      const clusterDocIds = data.docs;
      this.documentsOnDisplay = _.filter(this.documents, function (object) {
        return clusterDocIds.includes(object.id);
      })
      this.filteredDocuments = this.documentsOnDisplay;
      this.selected = this.deadlineDates[0].dateString;
    }

  }

  search(data: string) {
    this.queryString = data;
    this.getData();
  }

  onPaginateChange(event, array: Array<any>) {
    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    this.documentsOnDisplay = array.slice(startIndex, endIndex);
  }

  transformDatesArray(sourceArray: Array<any>) {
    this.deadlineDates = [];
    for (let i = 0; i < sourceArray.length; i = i + 2) {
      let object = {
        dateString: sourceArray[i],
        matchesCount: sourceArray[i + 1]
      }
      this.deadlineDates.splice(i, 2, object);
    }
    let object = {
      dateString: 'All dates',
      matchesCount: 'all'
    }
    let resetObject = {
      dateString: 'No date selected',
      matchesCount: '-'
    }
    this.deadlineDates.unshift(object);
    this.deadlineDates.unshift(resetObject);
  }

  getDataFromSelectedDate(event) {
    const facetsField = (this.dataFlag) ? environment.sourceFacetsField2 : environment.sourceFacetsField1;
    if (!((event.value === 'All dates')||(event.value === 'No date selected'))) {
      this.filteredDocuments = _.filter(this.documents, function(doc) {
        console.log(event.value);
        return doc[facetsField] === event.value;
      });
    } else{
      this.filteredDocuments = this.documents;
    }

    this.onPaginateChange(this.initPaginator, this.filteredDocuments)
  }

}
