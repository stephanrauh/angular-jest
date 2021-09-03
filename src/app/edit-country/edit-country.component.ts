import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ContinentService } from '../backend/continent.service';
import { Country } from '../backend/country';

@Component({
  selector: 'app-edit-country',
  templateUrl: './edit-country.component.html',
  styleUrls: ['./edit-country.component.scss']
})
export class EditCountryComponent implements OnInit {

  public country$!: Observable<Country | undefined>;

  public formGroup: FormGroup = new FormGroup({
     name: new FormControl('', Validators.required),
     population: new FormControl('', Validators.required),
     region: new FormControl('', [Validators.required, Validators.minLength(4)]),
     flag: new FormControl('', Validators.required)
  });

  constructor(private route: ActivatedRoute, private continentService: ContinentService) { }

  public ngOnInit(): void {
    this.country$ = this.route.params.pipe(
      map((parameters) => parameters['country']),
      map(countryName => this.findCountryFromContinentService(countryName)),
      switchMap(country$ => country$),
      tap(country => this.fillInData(country)),
    );
  }

  private fillInData(country: Country | undefined): void {
    this.formGroup.get('name')?.patchValue(country?.name || 'unknown');
    this.formGroup.get('region')?.patchValue(country?.region || 'unknown');
    this.formGroup.get('population')?.patchValue(country?.population || 'unknown');
    this.formGroup.get('flag')?.patchValue(country?.flag || 'unknown');
  }

  private findCountryFromContinentService(countryName: string): Observable<Country | undefined> {
    return this.continentService.countries$.pipe(map(countries => this.findCountry(countries, countryName)));
  }

  private findCountry(countries: Country[], countryName: string): Country | undefined {
    const country = countries.find(c => c.name === countryName);
    return country;
  }

  public save(): void {
    this.continentService.save(this.formGroup.value as Country);
  }

}
