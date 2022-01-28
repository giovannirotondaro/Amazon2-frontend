import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaUtenteAdminComponent } from './modifica-utente-admin.component';

describe('ModificaUtenteAdminComponent', () => {
  let component: ModificaUtenteAdminComponent;
  let fixture: ComponentFixture<ModificaUtenteAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificaUtenteAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificaUtenteAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
