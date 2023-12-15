import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { ConfirmationService } from "primeng/api";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { EditCountryComponent } from "./edit-country.component";

describe('Save-Country-Question', () => {
  let fixture: ComponentFixture<EditCountryComponent>;
  let service: ConfirmationService;
  let component: EditCountryComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCountryComponent],
      providers: [ConfirmationService],
      imports: [ConfirmDialogModule, RouterTestingModule, HttpClientTestingModule, NoopAnimationsModule],
    }).compileComponents();

    service = TestBed.inject(ConfirmationService);

    fixture = TestBed.createComponent(EditCountryComponent);
    component = fixture.componentInstance;

    fixture.detectChanges(); // ngOnInit()
  });

  it("Should render the confirmation dialog", () => {
    service.confirm({
      key: 'confirm-save-country',
    });
    fixture.detectChanges();
    const msgSpan = document.querySelector(".p-confirm-dialog-message") as HTMLElement;
    expect(msgSpan.innerHTML).toBe("Do you want to save the country?");
    expect(document.body).toMatchSnapshot();
  })
});
