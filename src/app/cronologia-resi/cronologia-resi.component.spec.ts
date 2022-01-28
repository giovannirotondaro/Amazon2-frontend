/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CronologiaResiComponent } from './cronologia-resi.component';


describe('CronologiaResiComponent', () => {
  let component: CronologiaResiComponent;
  let fixture: ComponentFixture<CronologiaResiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CronologiaResiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CronologiaResiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
