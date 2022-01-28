import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceltaRecuperoComponent } from './scelta-recupero.component';

describe('SceltaRecuperoComponent', () => {
  let component: SceltaRecuperoComponent;
  let fixture: ComponentFixture<SceltaRecuperoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SceltaRecuperoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SceltaRecuperoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
