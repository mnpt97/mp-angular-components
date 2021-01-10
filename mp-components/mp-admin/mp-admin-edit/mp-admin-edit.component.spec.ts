import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpAdminEditComponent } from './mp-admin-edit.component';

describe('MpAdminEditComponent', () => {
  let component: MpAdminEditComponent;
  let fixture: ComponentFixture<MpAdminEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpAdminEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpAdminEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
