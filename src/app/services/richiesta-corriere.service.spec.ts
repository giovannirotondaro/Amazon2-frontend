import { TestBed } from '@angular/core/testing';

import { RichiestaCorriereService } from './richiesta-corriere.service';

describe('RichiestaCorriereService', () => {
  let service: RichiestaCorriereService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RichiestaCorriereService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
