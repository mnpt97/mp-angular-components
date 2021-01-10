import { TestBed } from '@angular/core/testing';

import { ScreenPropertiesService } from './screen-properties.service';

describe('ScreenPropertiesService', () => {
  let service: ScreenPropertiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScreenPropertiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
