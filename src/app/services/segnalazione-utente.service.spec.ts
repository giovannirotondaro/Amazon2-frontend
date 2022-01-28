import { TestBed } from '@angular/core/testing';

import { SegnalazioneUtenteService } from './segnalazione-utente.service';

describe('SegnalazioneUtenteService', () => {
  let service: SegnalazioneUtenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SegnalazioneUtenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
