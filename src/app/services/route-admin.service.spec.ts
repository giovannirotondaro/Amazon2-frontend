import { TestBed } from '@angular/core/testing';

import { RouteAdminService } from './route-admin.service';

describe('RouteAdminService', () => {
  let service: RouteAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
