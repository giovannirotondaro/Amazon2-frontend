import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaCorriereComponent } from './area-corriere.component';

describe('AreaCorriereComponent', () => {
  let component: AreaCorriereComponent;
  let fixture: ComponentFixture<AreaCorriereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaCorriereComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaCorriereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
