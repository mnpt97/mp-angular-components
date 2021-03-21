import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpFroalaFireUploadEditorComponent } from './mp-froala-fire-upload-editor.component';

describe('MpFroalaFireUploadEditorComponent', () => {
  let component: MpFroalaFireUploadEditorComponent;
  let fixture: ComponentFixture<MpFroalaFireUploadEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpFroalaFireUploadEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpFroalaFireUploadEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
