import { Component, OnInit, OnDestroy } from '@angular/core';
import {shortMonths, shortDays} from '../../data/data.shared'
import { Observable, timer } from 'rxjs';
import { map, shareReplay } from "rxjs/operators";

@Component({
  selector: 'app-digital-clock',
  templateUrl: './digital-clock.component.html',
  styleUrls: ['./digital-clock.component.css'],
})
export class DigitalClockComponent implements OnInit {
  date: string;
  time: string;
  private _timer$: Observable<Date> = timer(0, 1000).pipe(
    map(tick => new Date()),
    shareReplay(1)
  );

  constructor() {
    this.timer.subscribe(datetime => this.updateTimeAndDate(datetime))
  }

  ngOnInit(): void {}

  get timer() {
    return this._timer$;
  }

  updateTimeAndDate(datetime: Date) {
    this.time = new Date().toLocaleTimeString('it-IT');
    this.date = this.formatDateAsRequired(datetime);
  }

  formatDateAsRequired(rawDateTime: Date): string {
    //Mon 22 Jan, 2016
    const day = shortDays[rawDateTime.getDay()];
    const date = rawDateTime.getDate();
    const month = shortMonths[rawDateTime.getMonth()];
    const year = rawDateTime.getFullYear();
    return `${day} ${date} ${month}, ${year}`;
  }

}
