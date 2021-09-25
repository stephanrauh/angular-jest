import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ContinentService } from '../continent-service/continent.service';
import { Country } from '../continent-service/country';

@Component({
  selector: 'app-edit-country',
  templateUrl: './edit-country.component.html',
  styleUrls: ['./edit-country.component.scss'],
})
export class EditCountryComponent implements OnInit {
  public country$!: Observable<Country | undefined>;

  public formGroup: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    population: new FormControl('', Validators.required),
    region: new FormControl('', [Validators.required, Validators.minLength(4)]),
    flag: new FormControl('', Validators.required),
  });

  public canSave$ = this.formGroup.statusChanges.pipe(map(() => this.formGroup.valid));

  constructor(private route: ActivatedRoute, private continentService: ContinentService, private confirmation: ConfirmationService) {}

  public ngOnInit(): void {
    this.country$ = this.route.params.pipe(
      map((parameters) => parameters['country']),
      map((countryName) => this.findCountryFromContinentService(countryName)),
      switchMap((country$) => country$),

      tap((country) => this.fillInData(country))
    );
  }

  private fillInData(country: Country | undefined): void {
    console.log('Fill in data');
    this.formGroup.get('name')?.patchValue(country?.name || 'unknown');
    this.formGroup.get('region')?.patchValue(country?.region || 'unknown');
    this.formGroup.get('population')?.patchValue(country?.population || 'unknown');
    this.formGroup.get('flag')?.patchValue(country?.flag || 'unknown');
  }

  private findCountryFromContinentService(countryName: string): Observable<Country | undefined> {
    return this.continentService.countries$.pipe(map((countries) => this.findCountry(countries, countryName)));
  }

  private findCountry(countries: Country[], countryName: string): Country | undefined {
    console.log('Find country');
    const country = countries.find((c) => c.name === countryName);
    return country;
  }

  public save(): void {
    this.confirmation.confirm({
      key: 'confirm-save-country',
      message: 'Do you want to save the country?',
      accept: () => {
        this.doSave();
      },
    });
  }

  public doSave(): void {
    this.continentService.save(this.formGroup.value as Country);
  }
}
