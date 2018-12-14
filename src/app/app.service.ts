/**
 * Created by perezom on 20/09/2017.
 */

import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { environment } from "../environments/environment";
import { HttpClient, HttpResponse, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators/map";

@Injectable()
export class AppService {
  constructor(private http: HttpClient) {}

  public getData(
    queryString: string,
    flag: boolean,
    dateString: string
  ): Observable<any> {
    if (!queryString) {
      queryString = "*";
    }
    if (!dateString || dateString === '("All dates")') {
      dateString = "*";
    }
    const solrCore = environment.core1;
    const schemaField = environment.sourceSchemaField1;
    const schemaField1 = environment.sourceSchemaField1a;
    const schemaField2 = environment.sourceSchemaField1b;
    const facetsField = environment.sourceFacetsField1;

    const httpOptions = {
      params: new HttpParams()
        .set("facet.field", facetsField)
        .set("facet", "on")
        .set("sow", "false")
        .set("indent", "on")
        .set("rows", "32")
        .set(
          "q",
          "(" +
            facetsField +
            ":" +
            dateString +
            ") AND (" +
            schemaField +
            ":" +
            queryString +
            " OR " +
            schemaField1 +
            ":" +
            queryString +
            " OR " +
            schemaField2 +
            ":" +
            queryString +
            ")"
        )
        .set(
          "hl.fl",
          schemaField1 +
            " " +
            schemaField1 +
            " " +
            schemaField2
        )
        .set("hl", "on")
        .set("wt", "json")
    };

    return this.http
      .get(environment.server + "solr/" + solrCore + "/select", httpOptions)
      .pipe(
        map((res: HttpResponse<any>) => {
          return res;
        })
      );
  }

  public getMoreLikeThisData(doc: any, flag: boolean): Observable<any> {
    const solrCore = environment.core1;
    const docId = doc.id;
    const id = "id";

    return this.http.get(
      environment.server +
        "solr/" +
        solrCore +
        "/mlt?indent=on&q=" +
        id +
        ":" +
        docId +
        "&rows=5&wt=json"
    );
  }
}
