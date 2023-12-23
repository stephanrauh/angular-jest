import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedLibraryService {

  private counter = 1;

  constructor() { }

  public incrementCounter(): void {
    this.counter++;
  }

  public helloWorld(): string {
    return `¡Hola mundo ${this.counter}!`;
  }
}
