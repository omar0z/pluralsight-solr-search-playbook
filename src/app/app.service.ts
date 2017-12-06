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

  public getData(queryString : String, flag: boolean): Observable<any> {
    if(!queryString){
      queryString = "*";
    }
    const solrCore = (flag) ? environment.core2 : environment.core3;
    const schemaField = (flag) ? environment.sourceSchemaField2 : environment.sourceSchemaField1;
    //
    return this.http.get(environment.server+ "solr/"+solrCore+"/clustering?sow=false&indent=on&q="+schemaField+":"+queryString+"&wt=json")
      .map((res: Response) => {
        return res;
      });
  }
}
