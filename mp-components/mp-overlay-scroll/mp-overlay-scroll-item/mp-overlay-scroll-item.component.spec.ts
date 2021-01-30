import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpOverlayScrollItemComponent } from './mp-overlay-scroll-item.component';

describe('MpOverlayScrollItemComponent', () => {
  let component: MpOverlayScrollItemComponent;
  let fixture: ComponentFixture<MpOverlayScrollItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpOverlayScrollItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpOverlayScrollItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
