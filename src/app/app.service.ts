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

  public getDataFirstCore(queryString : String): Observable<any> {
    if(!queryString){
      queryString = "*";
    }
    //
    return this.http.get(environment.server+ "solr/"+environment.core1+"/clustering?sow=false&indent=on&q="+environment.sourceSchemaField1+":"+queryString+"&wt=json")
      .map((res: Response) => {
        return res;
      });
  }

  public getDataSecondCore(queryString : String): Observable<any> {
    if(!queryString){
      queryString = "*";
    }
    //
    return this.http.get(environment.server+ "solr/"+environment.core2+"/clustering?sow=false&indent=on&q="+environment.sourceSchemaField2+":"+queryString+"&wt=json")
      .map((res: Response) => {
        return res;
      });
  }


  public getDataThirdCore(queryString : String): Observable<any> {
    if(!queryString){
      queryString = "*";
    }
    //
    return this.http.get(environment.server+ "solr/"+environment.core3+"/clustering?sow=false&indent=on&q="+environment.sourceSchemaField1+":"+queryString+"&wt=json")
      .map((res: Response) => {
        return res;
      });
  }
}
