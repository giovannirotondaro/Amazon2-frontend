import { TestBed } from '@angular/core/testing';
import { UtenteService } from './utente.service';

describe('RegistrazioneService', () => {
  let service: UtenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
