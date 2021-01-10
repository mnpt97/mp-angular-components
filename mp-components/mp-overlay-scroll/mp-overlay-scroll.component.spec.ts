import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpOverlayScrollComponent } from './mp-overlay-scroll.component';

describe('MpOverlayScrollComponent', () => {
  let component: MpOverlayScrollComponent;
  let fixture: ComponentFixture<MpOverlayScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpOverlayScrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpOverlayScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
