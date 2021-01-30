import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpSlideshowComponent } from './mp-slideshow.component';

describe('MpSlideshowComponent', () => {
  let component: MpSlideshowComponent;
  let fixture: ComponentFixture<MpSlideshowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpSlideshowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpSlideshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
