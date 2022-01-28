import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizzaColloquiComponent } from './visualizza-colloqui.component';

describe('VisualizzaColloquiComponent', () => {
  let component: VisualizzaColloquiComponent;
  let fixture: ComponentFixture<VisualizzaColloquiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizzaColloquiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizzaColloquiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
