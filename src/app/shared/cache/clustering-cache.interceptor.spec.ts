import { TestBed, inject } from '@angular/core/testing';

import { ClusteringCacheInterceptor } from './clustering-cache.interceptor.service';

describe('ClusteringCacheInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClusteringCache.InterceptorService]
    });
  });

  it('should be created', inject([ClusteringCache.InterceptorService], (service: ClusteringCache.InterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
