import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllaEmailComponent } from './controlla-email.component';

describe('ControllaEmailComponent', () => {
  let component: ControllaEmailComponent;
  let fixture: ComponentFixture<ControllaEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControllaEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControllaEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
