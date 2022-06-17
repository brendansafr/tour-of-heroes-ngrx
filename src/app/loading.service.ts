import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  loadIndicators: boolean[] = [false];

  constructor() {}

  addLoadIndicator(): number {
    this.loadIndicators.push(false);
    return this.loadIndicators.length - 1;
  }

  getLoadIndicator(id: number) {
    return this.loadIndicators[id];
  }

  setLoadIndicator(id: number, value: boolean) {
    this.loadIndicators[id] = value;
  }
}
