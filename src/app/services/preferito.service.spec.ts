import { TestBed } from '@angular/core/testing';

import { PreferitoService } from './preferito.service';

describe('PreferitoService', () => {
  let service: PreferitoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreferitoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
