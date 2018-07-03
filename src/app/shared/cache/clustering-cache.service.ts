import {Injectable} from '@angular/core';
import {HttpResponse} from "@angular/common/http";

@Injectable()
export class ClusteringCacheService {

  private requests: any = {};

  constructor() {
  }

  put(url: string, response: HttpResponse<any>): void {
    this.requests[url] = response;
  }

  // put(label: string, value: any): void {
  //   this.requests[label] = value;
  // }

  get(url: string): HttpResponse<any> | undefined {
    return this.requests[url];
  }

  invalidateUrl(url: string): void {
    this.requests[url] = undefined;
  }

  invalidateCache(): void {
    this.requests = {};
  }

  getCache() : any {
    return this.requests;
  }

}
