import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpHomeComponent } from './mp-home.component';

describe('MpHomeComponent', () => {
  let component: MpHomeComponent;
  let fixture: ComponentFixture<MpHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
