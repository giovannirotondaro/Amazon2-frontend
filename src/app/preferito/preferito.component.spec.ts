import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferitoComponent } from './preferito.component';

describe('PreferitoComponent', () => {
  let component: PreferitoComponent;
  let fixture: ComponentFixture<PreferitoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreferitoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
