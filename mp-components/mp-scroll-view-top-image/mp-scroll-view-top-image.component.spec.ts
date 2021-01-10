import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpScrollViewTopImageComponent } from './mp-scroll-view-top-image.component';

describe('MpScrollViewTopImageComponent', () => {
  let component: MpScrollViewTopImageComponent;
  let fixture: ComponentFixture<MpScrollViewTopImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpScrollViewTopImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpScrollViewTopImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
