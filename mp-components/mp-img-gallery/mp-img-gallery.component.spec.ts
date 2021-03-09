import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpImgGalleryComponent } from './mp-img-gallery.component';

describe('MpImgGalleryComponent', () => {
  let component: MpImgGalleryComponent;
  let fixture: ComponentFixture<MpImgGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpImgGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpImgGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
