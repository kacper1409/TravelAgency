import { TestBed } from '@angular/core/testing';

import { AppRouteChangeService } from './app-route-change.service';

describe('AppRouteChangeService', () => {
  let service: AppRouteChangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppRouteChangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
