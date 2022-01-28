import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioneAdminComponent } from './gestione-admin.component';

describe('GestioneAdminComponent', () => {
  let component: GestioneAdminComponent;
  let fixture: ComponentFixture<GestioneAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestioneAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestioneAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
