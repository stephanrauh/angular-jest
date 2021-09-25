import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from './country';
import { map, tap } from 'rxjs/operators';
import { Continent } from './continent';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContinentService {

  public listOfContinents$!: Observable<Array<string>>;

  public countries$!: Observable<Country[]>;

  public continents$!: Observable<Array<Continent>>;

  constructor(private httpClient: HttpClient) {
    this.readContinents2();
  }

  public readContinents2() {
    console.log("Reading continents from web")
    this.countries$ = this.httpClient.get<Array<Country>>('https://restcountries.com/v2/all').pipe(tap(x => console.log("Read", x)));
    this.continents$ = this.countries$.pipe(map((countries) => this.extractContinents(countries)));
    this.listOfContinents$ = this.countries$.pipe(map((countries) => this.extractContinentNames(countries)));
  }

  private extractContinentNames(countries: Array<Country>): Array<string> {
    const listOfNames = countries.map((country) => country.region);
    const listOfNonEmptyNames = listOfNames.filter((continent) => continent !== '');
    const uniqueNames = new Set(listOfNonEmptyNames);
    const arrayOfUniqueNames = [...uniqueNames];
    return arrayOfUniqueNames;
  }

  private extractContinents(countries: Array<Country>): Array<Continent> {
    const continentNames = this.extractContinentNames(countries);
    const continents = continentNames.map((name) => ({
      name,
      countriesInContinent: countries.filter((country) => country.region === name),
    }));
    return continents;
  }

  public save(modifiedCountry: Country): void {
    console.log("todo: implement save()");
    console.log(`Country to save: ${JSON.stringify(modifiedCountry)}`);
  }

}
