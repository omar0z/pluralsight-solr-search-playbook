import { TestBed, inject } from '@angular/core/testing';

import { ClusteringCacheService } from './clustering-cache.service';

describe('ClusteringCacheService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClusteringCacheService]
    });
  });

  it('should be created', inject([ClusteringCacheService], (service: ClusteringCacheService) => {
    expect(service).toBeTruthy();
  }));
});
