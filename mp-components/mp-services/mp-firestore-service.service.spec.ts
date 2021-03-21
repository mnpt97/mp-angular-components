import { TestBed } from '@angular/core/testing';

import { MpFirestoreServiceService } from './mp-firestore-service.service';

describe('MpFirestoreServiceService', () => {
  let service: MpFirestoreServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MpFirestoreServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
