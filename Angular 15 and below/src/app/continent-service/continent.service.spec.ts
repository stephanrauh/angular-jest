import { TestBed } from '@angular/core/testing';

import { ContinentService } from './continent.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ContinentService', () => {
  let service: ContinentService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(ContinentService);
  });

  it('should be created', async () => {
    expect(service).toBeTruthy();
    const httpMock = TestBed.inject(HttpTestingController);

    const countries = [
      {
        name: 'España',
        region: 'Europa',
        population: 47000000,
        flag: 'https://flags.com/spain',
      },
    ];

    // const result = await service.countries$.toPromise(); // doesn't work!
    service.countries$.subscribe((result) => {
      expect(result[0].name).toBe('España');
    });

    const mockRequest = httpMock.expectOne('https://restcountries.com/v2/all');
    mockRequest.flush(countries);
  });
});
