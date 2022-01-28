import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserisciEmailRecuperoPasswordComponent } from './inserisci-email-recupero-password.component';

describe('InserisciEmailRecuperoPasswordComponent', () => {
  let component: InserisciEmailRecuperoPasswordComponent;
  let fixture: ComponentFixture<InserisciEmailRecuperoPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InserisciEmailRecuperoPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InserisciEmailRecuperoPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
