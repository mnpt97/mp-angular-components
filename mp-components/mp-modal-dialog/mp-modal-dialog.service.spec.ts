import { TestBed } from '@angular/core/testing';

import { MpModalDialogService } from './mp-modal-dialog.service';

describe('MpModalDialogService', () => {
  let service: MpModalDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MpModalDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
