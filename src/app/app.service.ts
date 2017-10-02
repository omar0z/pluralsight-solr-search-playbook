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

  public getData(queryString : String): Observable<any> {
    if(!queryString){
      queryString = "*";
    }
    //
    return this.http.get(environment.server+ "solr/"+environment.core+"/clustering?indent=on&q="+environment.sourceSchemaField+":*"+queryString+"*&rows=500&wt=json")
      .map((res: Response) => {
        return res;
      });
  }
}
