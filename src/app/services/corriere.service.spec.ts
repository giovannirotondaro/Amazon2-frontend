import { TestBed } from '@angular/core/testing';

import { CorriereService } from './corriere.service';

describe('CorriereService', () => {
  let service: CorriereService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorriereService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
