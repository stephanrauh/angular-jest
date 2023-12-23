import { TestBed } from '@angular/core/testing';

import { SharedLibraryService } from './shared-library.service';

describe('SharedLibraryService', () => {
  let service: SharedLibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedLibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
