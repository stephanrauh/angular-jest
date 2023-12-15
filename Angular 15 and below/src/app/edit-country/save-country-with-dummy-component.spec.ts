import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { ConfirmationService } from "primeng/api";
import { ConfirmDialogModule } from "primeng/confirmdialog";

@Component({template: `<p-confirmDialog
   key="confirm-save-country"
   message="Do you want to save the country?">
</p-confirmDialog>`})
class DummyComponent {}

describe('Save-Country-Question', () => {
  let fixture: ComponentFixture<DummyComponent>;

  let component: DummyComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DummyComponent],
      providers: [ConfirmationService],
      imports: [ConfirmDialogModule, RouterTestingModule, HttpClientTestingModule, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DummyComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it("Should render the confirmation dialog", () => {
    const service = TestBed.inject(ConfirmationService);;
    service.confirm({
      key: 'confirm-save-country',
    });
    fixture.detectChanges();
    const msgSpan = document.querySelector(".p-confirm-dialog-message") as HTMLElement;
    expect(msgSpan.innerHTML).toBe("Do you want to save the country?");
    expect(document.body).toMatchSnapshot();
  })
});
