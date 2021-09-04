import { Country } from './country';

export interface Continent {
  name: string;
  countriesInContinent: Array<Country>;
}
