/**
 * Created by perezom on 20/09/2017.
 */

import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Rx";
import {environment} from "../environments/environment";
import {Http, Response} from "@angular/http";

@Injectable()
export class AppService {

  constructor(private http: Http) {
  }

  public getData(queryString : string, flag: boolean, dateString: string): Observable<any> {
    if(!queryString){
      queryString = "*";
    }
    if(!dateString || dateString === "(\"All dates\")"){
      dateString = "*";
    }
    const solrCore = (flag) ? environment.core2 : environment.core3;
    const schemaField = (flag) ? environment.sourceSchemaField2 : environment.sourceSchemaField1;
    const schemaField1 = (flag) ? environment.sourceSchemaField2a : environment.sourceSchemaField1a;
    const schemaField2 = (flag) ? environment.sourceSchemaField2b : environment.sourceSchemaField1b;
    const schemaField3 = (flag) ? environment.sourceSchemaField2c : environment.sourceSchemaField1c;
    const facetsField = (flag) ? environment.sourceFacetsField2 : environment.sourceFacetsField1;

    return this.http.get(environment.server + "solr/"+solrCore+"/clustering?facet.field="
      +facetsField+"&facet=on&sow=false&indent=on&q="
      +"("+facetsField+":"+dateString
      +") AND ("+schemaField+":"+queryString
      +" OR "+schemaField1+":"+queryString
      +" OR "+schemaField2+":"+queryString
      +" OR "+schemaField3+":"+queryString+")"
      +"&wt=json").map((res: Response) => {
        return res;
      });
  }

}
