import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpAdminComponentWrapperComponent } from './mp-admin-component-wrapper.component';

describe('MpAdminComponentWrapperComponent', () => {
  let component: MpAdminComponentWrapperComponent;
  let fixture: ComponentFixture<MpAdminComponentWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpAdminComponentWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpAdminComponentWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
