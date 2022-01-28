import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdottiVenditoreComponent } from './prodotti-venditore.component';

describe('ProdottiVenditoreComponent', () => {
  let component: ProdottiVenditoreComponent;
  let fixture: ComponentFixture<ProdottiVenditoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdottiVenditoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdottiVenditoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
