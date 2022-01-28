import { TestBed } from '@angular/core/testing';

import { CartaCreditoService } from './carta-credito.service';

describe('CartaCreditoService', () => {
  let service: CartaCreditoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartaCreditoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
