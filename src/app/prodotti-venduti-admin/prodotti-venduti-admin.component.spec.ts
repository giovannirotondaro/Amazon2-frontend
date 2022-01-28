import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdottiVendutiAdminComponent } from './prodotti-venduti-admin.component';

describe('ProdottiVendutiAdminComponent', () => {
  let component: ProdottiVendutiAdminComponent;
  let fixture: ComponentFixture<ProdottiVendutiAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdottiVendutiAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdottiVendutiAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
