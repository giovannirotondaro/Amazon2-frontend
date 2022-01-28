import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformazioniPersonaliComponent } from './informazioni-personali.component';

describe('InformazioniPersonaliComponent', () => {
  let component: InformazioniPersonaliComponent;
  let fixture: ComponentFixture<InformazioniPersonaliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformazioniPersonaliComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformazioniPersonaliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
