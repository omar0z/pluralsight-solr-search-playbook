import { Injectable } from '@angular/core';
import {Resolve, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {AppService} from "./app.service";
import {Observable} from "rxjs";

@Injectable()
export class DataResolverService implements Resolve<any>{

  constructor(public service: AppService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>{
    console.log(route)
    return this.service.getData(null, route.data.flag, null);
  }

}
