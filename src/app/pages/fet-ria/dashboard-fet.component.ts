import {Component, OnInit, Input, ChangeDetectorRef} from '@angular/core';
import {AppService} from "../../app.service";
import {Subject} from "rxjs";
import * as _ from "lodash";
import {PageEvent} from "@angular/material";
import {environment} from "../../../environments/environment";
import {ActivatedRoute} from "@angular/router";

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
  public isLoading: boolean = true;


  @Input()
  public dataFlag: boolean;


  constructor(public service: AppService, public route: ActivatedRoute, public changeRef: ChangeDetectorRef) {
    this.documents = new Array();
    this.filteredDocuments = new Array();
    this.documentsOnDisplay = new Array();
    this.clusters = new Array();
    this.queryString = "";
    this.subject = new Subject();
  }


  public ngOnInit() {

    let resolvedData = this.route.snapshot.data['data'];
    this.getData(resolvedData);
  }

  public getNewData() {
    this.deadlineDates = [];
    const facetsField = (this.dataFlag) ? environment.sourceFacetsField2 : environment.sourceFacetsField1;
    this.service.getData(this.queryString, this.dataFlag, this.dateString).subscribe(result => {
      this.transformDatesArray(result.facet_counts.facet_fields[facetsField]);
      this.queryString = "";
      console.log("result: ", result);
      this.documents = result.response.docs;
      this.filteredDocuments = result.response.docs;
      this.clusters = this.adaptKeysToFoamTreeFormat(result.clusters);
      this.initPaginator.length = this.documents.length;
      this.initPaginator.pageIndex = 0;
      this.initPaginator.pageSize = 10;
      this.onPaginateChange(this.initPaginator, this.filteredDocuments);
      this.notifyChildren();
      this.isLoading = false;
    });
  }

  public getData(result: any) {
    this.deadlineDates = [];
     console.log("result: ", result);
    const facetsField = (this.dataFlag) ? environment.sourceFacetsField2 : environment.sourceFacetsField1;
    this.transformDatesArray(result.facet_counts.facet_fields[facetsField]);
    this.queryString = "";
    console.log("result: ", result);
    this.documents = result.response.docs;
    this.filteredDocuments = result.response.docs;
    this.clusters = this.adaptKeysToFoamTreeFormat(result.clusters);
    this.initPaginator.length = this.documents.length;
    this.initPaginator.pageIndex = 0;
    this.initPaginator.pageSize = 10;
    this.onPaginateChange(this.initPaginator, this.filteredDocuments);
    this.isLoading = false;
  }

  notifyChildren() {
    this.subject.next(this.clusters);
  }

  // setClustersOnCache() {
  //   this.cache.put('clusters', this.clusters);
  // }
  setDateString(dateObject: any) {
    this.dateString = "";
    if (dateObject) {
      let index: number = 0;
      this.dateString = "(";
      while (index < dateObject.value.length) {
        this.dateString += (index + 1 == dateObject.value.length) ? "\"" + dateObject.value[index] + "\"" : "\"" + dateObject.value[index] + "\"" + " OR ";
        index++;
      }
      this.dateString += ")";
    } else {
      this.dateString = '';
    }
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
      if (clusterDocIds) {
        this.documentsOnDisplay = _.filter(this.documents, function (object) {
          return clusterDocIds.includes(object.id);
        })
      }

      this.filteredDocuments = this.documentsOnDisplay;
    }

  }

  search(data: string) {
    console.log(data);
    this.isLoading = true;
    this.queryString = data;
    this.getNewData();
  }

  onPaginateChange(event, array: Array<any>) {
    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    this.documentsOnDisplay = array.slice(startIndex, endIndex);
  }

  transformDatesArray(sourceArray: Array<any>) {
    if (this.deadlineDates.length > 0) return;
    for (let i = 0; i < sourceArray.length; i = i + 2) {
      let object = {
        dateString: sourceArray[i],
        matchesCount: sourceArray[i + 1]
      }
      this.deadlineDates.splice(i, 2, object);
    }

    this.deadlineDates = _.sortBy(this.deadlineDates, [function (date) {
      return Date.parse(date.dateString)
    }]);
    let object = {
      dateString: 'All dates',
      matchesCount: 'all'
    }
    this.deadlineDates.unshift(object);
  }

  getDataFromSelectedDate(event) {
    if (_.includes(event.value, 'All dates')) {
      event.value = ["All dates"];
      event.source.value = [event.source.value[0]];
    }
    this.setDateString(event);
  }


}
