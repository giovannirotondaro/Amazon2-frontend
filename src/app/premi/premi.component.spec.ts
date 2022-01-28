import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiComponent } from './premi.component';

describe('PremiComponent', () => {
  let component: PremiComponent;
  let fixture: ComponentFixture<PremiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PremiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
