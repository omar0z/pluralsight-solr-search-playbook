import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpEvent, HttpHandler, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {ClusteringCacheService} from "./clustering-cache.service";
import {tap} from "rxjs/operators/tap";
import {of}  from 'rxjs/observable/of';

@Injectable()
export class ClusteringCacheInterceptor implements HttpInterceptor {

  QUERY_FIRST_CORE: string = '(projectDeadlineDate:*) AND (projectAbstract:* OR projectTitle:* OR projectFreeKeywords:* OR projectAcronym:*)';

  QUERY_SECOND_CORE: string = '(proposalDeadlineDate:*) AND (proposalAbstract:* OR proposalTitle:* OR proposalFreeKeywords:* OR proposalAcronym:*)';

  constructor(private cacheService: ClusteringCacheService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.params.get('q') === this.QUERY_FIRST_CORE || req.params.get('q') === this.QUERY_SECOND_CORE) {

      const cachedResponse: HttpResponse<any> = this.cacheService.get(req.url);
      if (cachedResponse) {
        console.log(`Returning from cache: ${cachedResponse.url}`);
        return of(cachedResponse);
      }

      return next.handle(req).pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            console.log(`Adding item to the cache: ${req.url}`);
            this.cacheService.put(req.url, event);
          }
        })
      );

    }

    console.log('Non cacheable. Forwarding...');
    return next.handle(req);
  }

}
