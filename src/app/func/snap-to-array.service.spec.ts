import { TestBed } from '@angular/core/testing';

import { SnapToArrayService } from './snap-to-array.service';

describe('SnapToArrayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SnapToArrayService = TestBed.get(SnapToArrayService);
    expect(service).toBeTruthy();
  });
});
