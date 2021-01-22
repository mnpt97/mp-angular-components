import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpParallaxItemComponent } from './mp-parallax-item.component';

describe('MpParallaxItemComponent', () => {
  let component: MpParallaxItemComponent;
  let fixture: ComponentFixture<MpParallaxItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpParallaxItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpParallaxItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
