import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RichiesteCorrieriComponent } from './richieste-corrieri.component';

describe('RichiesteCorrieriComponent', () => {
  let component: RichiesteCorrieriComponent;
  let fixture: ComponentFixture<RichiesteCorrieriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RichiesteCorrieriComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RichiesteCorrieriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
