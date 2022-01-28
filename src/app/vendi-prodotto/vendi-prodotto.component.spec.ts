import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendiProdottoComponent } from './vendi-prodotto.component';

describe('VendiProdottoComponent', () => {
  let component: VendiProdottoComponent;
  let fixture: ComponentFixture<VendiProdottoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendiProdottoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendiProdottoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
