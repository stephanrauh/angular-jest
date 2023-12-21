import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SharedLibraryService } from 'shared-library';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app1';

  constructor(public sharedLibraryService: SharedLibraryService) {
    this.sharedLibraryService.incrementCounter();
  }
}
