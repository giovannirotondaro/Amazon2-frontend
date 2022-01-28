import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcquistiAdminComponent } from './acquisti-admin.component';

describe('AcquistiAdminComponent', () => {
  let component: AcquistiAdminComponent;
  let fixture: ComponentFixture<AcquistiAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcquistiAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcquistiAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
