/**
 * Created by perezom on 31/10/2017.
 */
import {Injectable} from '@angular/core';
import {Subject, Observable} from "rxjs";

@Injectable()
export class ClusterDataService {

  public clusterSubject: Subject<Object> = new Subject<any>();


  public setCluster(clusterObj: any){
    this.clusterSubject.next(clusterObj);
  }

  public getCluster(): Observable<any> {
    return this.clusterSubject.asObservable();
  }
}
