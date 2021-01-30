import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpHeaderNavigationComponent } from './mp-header-navigation.component';

describe('MpHeaderNavigationComponent', () => {
  let component: MpHeaderNavigationComponent;
  let fixture: ComponentFixture<MpHeaderNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpHeaderNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpHeaderNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
