import { TestBed } from '@angular/core/testing';

import { VoterTablesService } from './voter-tables.service';

describe('VoterTablesService', () => {
  let service: VoterTablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoterTablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
