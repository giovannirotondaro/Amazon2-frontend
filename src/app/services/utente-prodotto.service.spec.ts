import { TestBed } from '@angular/core/testing';

import { UtenteProdottoService } from './utente-prodotto.service';

describe('UtenteProdottoService', () => {
  let service: UtenteProdottoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtenteProdottoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
