import { Injectable } from '@angular/core';

@Injectable()
export class LogService {

  counter = 0;
  logs = [];

  constructor() { }

  add(data): void {
    this.logs.push(`${++this.counter}: ${data.message}`);
  }

  reset() {
    this.counter = 0;
    this.logs = [];
  }

}
