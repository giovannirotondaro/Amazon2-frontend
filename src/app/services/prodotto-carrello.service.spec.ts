import { TestBed } from '@angular/core/testing';

import { ProdottoCarrelloService } from './prodotto-carrello.service';

describe('ProdottoCarrelloService', () => {
  let service: ProdottoCarrelloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdottoCarrelloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
