import { TestBed } from '@angular/core/testing';

import { EntitlementsService } from './entitlements.service';

describe('EntitlementsService', () => {
  let service: EntitlementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntitlementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
