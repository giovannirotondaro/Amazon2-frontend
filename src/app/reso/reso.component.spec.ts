/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ResoComponent } from './reso.component';

describe('ResoComponent', () => {
  let component: ResoComponent;
  let fixture: ComponentFixture<ResoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
