/**
 * Created by perezom on 20/09/2017.
 */

import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Rx";
import {environment} from "../environments/environment";
import {HttpClient, HttpResponse, HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators/map";

@Injectable()
export class AppService {

  constructor(private http: HttpClient) {
  }

  public getData(queryString: string, flag: boolean, dateString: string): Observable<any> {
    if (!queryString) {
      queryString = "*";
    }
    if (!dateString || dateString === "(\"All dates\")") {
      dateString = "*";
    }
    const solrCore = (flag) ? environment.core2 : environment.core3;
    const schemaField = (flag) ? environment.sourceSchemaField2 : environment.sourceSchemaField1;
    const schemaField1 = (flag) ? environment.sourceSchemaField2a : environment.sourceSchemaField1a;
    const schemaField2 = (flag) ? environment.sourceSchemaField2b : environment.sourceSchemaField1b;
    const schemaField3 = (flag) ? environment.sourceSchemaField2c : environment.sourceSchemaField1c;
    const facetsField = (flag) ? environment.sourceFacetsField2 : environment.sourceFacetsField1;

    const httpOptions = {
      params: new HttpParams()
        .set('facet.field', facetsField)
        .set('facet', 'on')
        .set('sow', 'false')
        .set('indent', 'on')
        .set('q', "(" + facetsField + ":" + dateString + ") AND (" + schemaField + ":" + queryString + " OR " + schemaField1 + ":" + queryString + " OR " + schemaField2 + ":" + queryString + " OR " + schemaField3 + ":" + queryString + ")")
        .set('hl.fl', schemaField1 + " " + schemaField1 + " " + schemaField2 + " " + schemaField3)
        .set('hl', 'on')
        .set('wt', 'json')
    }


    return this.http.get(environment.server + "solr/" + solrCore + "/clustering", httpOptions).pipe(
      map((res: HttpResponse<any>) => {
          return res;
        }
      )
    );
  }

  public getMoreLikeThisData(doc: any, flag: boolean): Observable < any > {
    const solrCore = (flag) ? environment.core2 : environment.core3;
    const docId = (flag) ? doc.projectId : doc.proposalNumber;
    const id = (flag) ? 'projectId' : 'proposalNumber';

    return this.http.get(environment.server + "solr/" + solrCore + "/mlt?indent=on&q="
      + id + ":" + docId
      + "&rows=5&wt=json");
  }

}
