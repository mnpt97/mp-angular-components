import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpModalDialogComponent } from './mp-modal-dialog.component';

describe('MpModalDialogComponent', () => {
  let component: MpModalDialogComponent;
  let fixture: ComponentFixture<MpModalDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpModalDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
