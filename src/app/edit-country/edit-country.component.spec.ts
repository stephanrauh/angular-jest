import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCountryComponent } from './edit-country.component';
import { mockActivatedRoute } from './activated-route-mock';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('EditCountryComponent', () => {
  let component: EditCountryComponent;
  let fixture: ComponentFixture<EditCountryComponent>;
  let nameInputField: HTMLInputElement;
  let saveButton: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCountryComponent],
      providers: [mockActivatedRoute],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(EditCountryComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    await fixture.whenStable();
    nameInputField = fixture.nativeElement.querySelector('input[name="name"]') as HTMLInputElement;
    saveButton = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should store the input value in the formGroup', async () => {
    expect(nameInputField).toBeTruthy();
    nameInputField.value = 'Portugal';
    nameInputField.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();
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

  });
});
