import { ConfirmationService } from 'primeng/api';
import { EditCountryComponent } from './edit-country.component';
import { mockActivateRouteValue } from './activated-route-mock';
import { MockService } from 'ng-mocks';
import { ContinentService } from '../continent-service/continent.service';
import { of } from 'rxjs';
import { Country } from '../continent-service/country';

describe('EditCountryComponent', () => {
  let component: EditCountryComponent;

  beforeEach(() => {
    let service = MockService(ContinentService);
    service.countries$ = of<Country[]>([{ name: 'Spain', population: 0, flag: '', region: 'Europe' }]);
    component = new EditCountryComponent(mockActivateRouteValue, service, MockService(ConfirmationService));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update on navigation', () => {
    expect(component.formGroup.value.name).toBe("");
    component.ngOnInit();
    component.country$.subscribe();
    console.log(component.formGroup.value);
    expect(component.formGroup.value.name).toBe("Spain");
  });

  it('should validate the name', () => {
    component.formGroup.patchValue({ name: '' });
    expect(component.formGroup.controls.name.valid).toBeFalsy();
    component.formGroup.patchValue({ name: 'Bob' });
    expect(component.formGroup.controls.name.valid).toBeTruthy();
    component.formGroup.patchValue({ name: '' });
    expect(component.formGroup.controls.name.valid).toBeFalsy();
  });

  it.each([
    ['name', 'Spain'],
    ['population', '46940000'],
    ['region', 'Europe'],
    ['flag', 'https://example.com/flag-of-spain.gif'],
  ])(`should validate the %p field`, (name, value) => {
    const empty = {};
    empty[name] = '';
    const withValue = {};
    withValue[name] = value;
    component.formGroup.patchValue(empty);
    expect(component.formGroup.controls[name].valid).toBeFalsy();
    component.formGroup.patchValue(withValue);
    expect(component.formGroup.controls[name].valid).toBeTruthy();
    component.formGroup.patchValue(empty);
    expect(component.formGroup.controls[name].valid).toBeFalsy();
  });
});
