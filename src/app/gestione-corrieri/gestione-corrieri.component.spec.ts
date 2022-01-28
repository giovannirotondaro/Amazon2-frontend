import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioneCorrieriComponent } from './gestione-corrieri.component';

describe('GestioneCorrieriComponent', () => {
  let component: GestioneCorrieriComponent;
  let fixture: ComponentFixture<GestioneCorrieriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestioneCorrieriComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestioneCorrieriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
