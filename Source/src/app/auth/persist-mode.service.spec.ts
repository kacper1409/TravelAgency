import { TestBed } from '@angular/core/testing';

import { PersistModeService } from './persist-mode.service';

describe('PersistModeService', () => {
  let service: PersistModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersistModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
