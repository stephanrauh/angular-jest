import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedLibraryComponent } from './shared-library.component';

describe('SharedLibraryComponent', () => {
  let component: SharedLibraryComponent;
  let fixture: ComponentFixture<SharedLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedLibraryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
