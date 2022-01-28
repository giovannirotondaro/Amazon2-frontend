import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RicercaProdottoComponent } from './ricerca-prodotto.component';

describe('RicercaProdottoComponent', () => {
  let component: RicercaProdottoComponent;
  let fixture: ComponentFixture<RicercaProdottoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RicercaProdottoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RicercaProdottoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
