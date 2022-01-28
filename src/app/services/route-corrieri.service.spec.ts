import { TestBed } from '@angular/core/testing';

import { RouteCorrieriService } from './route-corrieri.service';

describe('RouteCorrieriService', () => {
  let service: RouteCorrieriService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteCorrieriService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
