import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpParallaxComponent } from './mp-parallax.component';

describe('MpParallaxComponent', () => {
  let component: MpParallaxComponent;
  let fixture: ComponentFixture<MpParallaxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpParallaxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpParallaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
