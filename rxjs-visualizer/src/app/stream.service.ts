import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { interval } from 'rxjs/observable/interval';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/switchMap';

import { Data } from './class/data';

@Injectable()
export class StreamService {

  items = [];
  operators = [
    'of',
    'map',
    'throttleTime',
    'debounceTime',
    'distinctUntilChanged',
    'merge',
    'switchMap',
    'skip',
    'take'
  ];
  stream = new Subject<any>();
  stream$ = this.stream.asObservable();

  constructor() { }

  do(x) {
    this.stream.next(x);
  }

  add(value) {
    this.items.push(new Data(value));

    setTimeout(() => {
      this.items.pop();
    }, 100);
  }

  // ========================
  // Operators
  // ========================

  of(): Observable<string> {
    return this.stream$;
  }

  map(): Observable<string> {
    return this.stream$
      .map(x => `map: ${x}`);
  }

  throttleTime(): Observable<string> {
    return this.stream$
      .throttleTime(250)
      .map(x => `throttleTime(250): ${x}`);
  }

  debounceTime(): Observable<string> {
    return this.stream$
      .debounceTime(250)
      .map(x => `debounceTime(250): ${x}`);
  }

  distinctUntilChanged(): Observable<string> {
    return this.stream$
      .distinctUntilChanged()
      .map(x => `distinctUntilChanged: ${x}`);
  }

  merge(): Observable<any> {
    return this.stream$
      .merge(
        interval(1200).take(4).map((index) => `(a: ${index + 1} / 4)`),
        interval(500).take(10).map((index) => `(b: ${index + 1} / 10)`),
      )
      .map(x => {
        if (x.startsWith('(a')) {
          return { message: `merge: ${x}`, color: 'rgb(226, 149, 126)' };
        } else if (x.startsWith('(b'))  {
          return { message: `merge: ${x}`, color: 'rgb(126, 226, 134)' };
        } else {
          return { message: `merge: ${x}` };
        }
      });
  }

  switchMap(): Observable<string> {
    return this.stream$
      .switchMap(x => {
        return interval(1000).take(5).map((index) => `switchMap: ${index} => ${x}`);
      });
  }

  skip(): Observable<string> {
    return this.stream$
      .skip(3)
      .map(x => `skip: ${x}`);
  }

  take(): Observable<string> {
    let counter = 0;
    return this.stream$
      .take(3)
      .map(x => `take(${++counter}): ${x}`);
  }
}
