import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  public log: string[] = [];

  constructor() {}

  getLog(): string[] {
    return this.log;
  }

  add(message: string) {
    this.log.unshift(message);
  }

  clear() {
    this.log = [];
  }
}
