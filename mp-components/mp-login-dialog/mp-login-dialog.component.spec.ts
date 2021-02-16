import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpLoginDialogComponent } from './mp-login-dialog.component';

describe('MpLoginDialogComponent', () => {
  let component: MpLoginDialogComponent;
  let fixture: ComponentFixture<MpLoginDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpLoginDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpLoginDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
