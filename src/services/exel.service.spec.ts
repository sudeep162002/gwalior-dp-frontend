import { TestBed } from '@angular/core/testing';

import { ExelService } from './exel.service';

describe('ExelService', () => {
  let service: ExelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
