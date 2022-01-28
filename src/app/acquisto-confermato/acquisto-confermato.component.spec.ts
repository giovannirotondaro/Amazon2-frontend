import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcquistoConfermatoComponent } from './acquisto-confermato.component';

describe('AcquistoConfermatoComponent', () => {
  let component: AcquistoConfermatoComponent;
  let fixture: ComponentFixture<AcquistoConfermatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcquistoConfermatoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcquistoConfermatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
