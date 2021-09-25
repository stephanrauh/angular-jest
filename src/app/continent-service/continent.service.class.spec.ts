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

jest.mock('./continent.service');
ContinentService.prototype.countries$ = of(countries);

const service = new ContinentService(null);

describe('ContinentService', () => {
  it('should be created', async () => {
    const result = await service.countries$.toPromise();
    expect(result[0].name).toBe('España');
  });
});
