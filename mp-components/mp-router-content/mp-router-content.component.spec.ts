import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpRouterContentComponent } from './mp-router-content.component';

describe('MpRouterContentComponent', () => {
  let component: MpRouterContentComponent;
  let fixture: ComponentFixture<MpRouterContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpRouterContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpRouterContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
