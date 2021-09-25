import { HttpClient } from '@angular/common/http';
import { MockService } from 'ng-mocks';
import { of } from 'rxjs';
import { ContinentService } from './continent.service';

const countries = [
  {
    name: 'España',
    region: 'Europa',
    population: 47000000,
    flag: 'https://flags.com/spain',
  },
];

const countries$ = of(countries);

describe('ContinentService', () => {
  let httpClientMock;
  let service;

  beforeEach(() => {
    httpClientMock = MockService(HttpClient);
    httpClientMock.get = jest.fn(() => countries$) as any;
    service = new ContinentService(httpClientMock);
  });

  afterEach(() => {
    document.body.innerHTML = '';
    document.head.innerHTML = '';
  });

  it('should be return the list of countries', async () => {
    const result = await service.countries$.toPromise();

    expect(httpClientMock.get).toHaveBeenCalled();
    expect(httpClientMock.get).toHaveLastReturnedWith(countries$);
    expect(httpClientMock.get).toHaveBeenCalledWith('https://restcountries.com/v2/all');
    expect(result[0].name).toBe('España');
  });

  it('should use a fresh copy (part 1)', async () => {
    await service.countries$.toPromise();
    service.used = true;
    httpClientMock.used = true;
    document.body.appendChild(document.createElement('canvas'));

    expect(httpClientMock.used).toBe(true);
    expect(document.body.querySelector('canvas')).not.toBeNull();
  });

  it('should use a fresh copy (part 2)', async () => {
    expect(service.used).not.toBe(true);
    expect(httpClientMock.get).toHaveBeenCalledTimes(1);
    expect(httpClientMock.used).not.toBe(true);
    expect(document.body.querySelector('canvas')).toBeNull();
  });
});
