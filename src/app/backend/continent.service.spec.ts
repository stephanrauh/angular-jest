import { TestBed } from '@angular/core/testing';

import { ContinentService } from './continent.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ContinentService', () => {
  let service: ContinentService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [
      HttpClientTestingModule
    ]});
    service = TestBed.inject(ContinentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
