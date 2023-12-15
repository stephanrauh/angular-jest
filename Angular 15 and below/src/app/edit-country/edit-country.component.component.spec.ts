import { ConfirmationService } from 'primeng/api';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCountryComponent } from './edit-country.component';
import { mockActivatedRoute } from './activated-route-mock';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ContinentService } from '../continent-service/continent.service';
import { MockComponent, MockService } from 'ng-mocks';
import { of } from 'rxjs';
import { Country } from '../continent-service/country';
import { ConfirmDialog } from 'primeng/confirmdialog';

describe('EditCountryComponent', () => {
  let component: EditCountryComponent;
  let fixture: ComponentFixture<EditCountryComponent>;
  let nameInputField: HTMLInputElement;
  let saveButton: HTMLButtonElement;
  let MockContinentService: ContinentService;

  beforeEach(async () => {
    MockContinentService = MockService(ContinentService);
    MockContinentService.countries$ = of<Array<Country>>([{name: "Spain", population: 0, region: "Europe", flag: undefined},
      {name: "Portugal", population: 0, region: "Europe", flag: undefined}])
    ;
    MockContinentService.save = jest.fn();
    await TestBed.configureTestingModule({
      declarations: [EditCountryComponent, MockComponent(ConfirmDialog)],
      providers: [mockActivatedRoute, {  provide: ContinentService, useValue: MockContinentService},
      ConfirmationService],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(EditCountryComponent);
    component = fixture.componentInstance;

    fixture.detectChanges(); // ngOnInit()
    // await fixture.whenStable();
    nameInputField = fixture.nativeElement.querySelector('input[name="name"]') as HTMLInputElement;
    saveButton = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update on navigation', async () => {
    fixture.detectChanges();
    component.country$.subscribe();
    // await component.country$.toPromise(); // <<< this does't work
    // await fixture.whenStable();
    expect(component.formGroup.value.name).toBe("Spain")
  });

  it('should store the input value in the formGroup', async () => {
    expect(nameInputField).toBeTruthy();
    nameInputField.value = 'Portugal';
    nameInputField.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    // await fixture.whenStable();
    expect(component.formGroup.get('name').value).toBe('Portugal');
  });

  it('should save the form data', async () => {
    expect(nameInputField).toBeTruthy();
    nameInputField.value = 'Portugal';
    nameInputField.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.formGroup.get('name').value).toBe('Portugal');
    saveButton.click();
    await fixture.whenStable();
    expect(MockContinentService.save).not.toBeCalled();
  });
});
