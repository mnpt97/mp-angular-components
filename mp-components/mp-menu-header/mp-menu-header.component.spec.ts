import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpMenuHeaderComponent } from './mp-menu-header.component';

describe('MpMenuHeaderComponent', () => {
  let component: MpMenuHeaderComponent;
  let fixture: ComponentFixture<MpMenuHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpMenuHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpMenuHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
