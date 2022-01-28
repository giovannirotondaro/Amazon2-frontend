import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovaRecensioneComponent } from './approva-recensione.component';

describe('ApprovaRecensioneComponent', () => {
  let component: ApprovaRecensioneComponent;
  let fixture: ComponentFixture<ApprovaRecensioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovaRecensioneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovaRecensioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
