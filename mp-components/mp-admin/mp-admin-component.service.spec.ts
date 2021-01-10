import { TestBed } from '@angular/core/testing';

import { MpAdminComponentService} from './mp-admin-component.service';

describe('MpAdminComponentServiceService', () => {
  let service: MpAdminComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MpAdminComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
