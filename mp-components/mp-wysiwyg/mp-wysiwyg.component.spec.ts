import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpWysiwygComponent } from './mp-wysiwyg.component';

describe('MpWysiwygComponent', () => {
  let component: MpWysiwygComponent;
  let fixture: ComponentFixture<MpWysiwygComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpWysiwygComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpWysiwygComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
