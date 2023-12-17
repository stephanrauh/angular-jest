import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  test('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  test(`should have the 'Angular 17' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Angular 17');
  });

  test('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, Angular 17');
  });

  test('should greet', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const greeting = fixture.componentInstance.greet();
    expect(greeting).toBe('Hello, Angular 17');
  });

  test('should mock the greeting', () => {
    AppComponent.prototype.greet = jest.fn().mockReturnValue('Bonjour, Angular dix-sept');
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const greeting = fixture.componentInstance.greet();
    expect(greeting).toBe('Bonjour, Angular dix-sept');
  });
});
