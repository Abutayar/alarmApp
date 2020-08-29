import { Injectable } from '@angular/core';
import { DbServiceService } from '../db-service/db-service.service';
import {
  DBInsertInterface,
  daysInterface,
} from 'src/app/_interfaces/db.interface';
import * as moment from 'moment';
import { days } from 'src/app/shared/data/data.shared';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { filter, map, shareReplay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AlarmService {
  playlist = {
    Beep: '/assets/alarm-sounds/beep.mp3',
    Radar: '/assets/alarm-sounds/radar.mp3',
  };
  listOfAlarm: DBInsertInterface[] = [];
  sequenceOfAlarm = new BehaviorSubject<DBInsertInterface[]>(null);
  sequenceOfAlarm$ = this.sequenceOfAlarm
    .asObservable()
    .pipe(filter((value) => value != null));
  invokeAlarmPop = new BehaviorSubject<DBInsertInterface>(null);
  invokeAlarmPop$ = this.invokeAlarmPop
    .asObservable();

  nextAlarmTriggerAt: number;
  private _timer$: Observable<Date> = timer(0, moment().millisecond()).pipe(
    map((tick) => new Date()),
    shareReplay(1)
  );
  constructor(private dbService: DbServiceService) {
    this.timer.subscribe((datetime) => {
      this.invokeAlarm(datetime);
    });
  }

  get timer() {
    return this._timer$;
  }

  queueAlarm() {
    const data = this.dbService.read();
    this.listOfAlarm = [];
    for (let alarm in data) {
      const alarmMeta = data[alarm];
      this.listOfAlarm.push(alarmMeta);
    }
    this.listOfAlarm.sort((a, b) =>
      moment(a.nextTrigger).isAfter(b.nextTrigger)
        ? 1
        : moment(a.nextTrigger).isBefore(b.nextTrigger)
        ? -1
        : 0
    );
    this.sequenceOfAlarm.next(this.listOfAlarm);
  }

  getAlarmList() {
    return this.sequenceOfAlarm$;
  }

  playAudio(sound: string, timeInSecond?: number) {
    let audio = new Audio();
    audio.src = this.playlist[sound];
    audio.load();
    audio.play();
    if(timeInSecond === 0) return audio;
    const timeout = timeInSecond || audio.duration;

    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, timeout);
  }

  createNextTrigger(hh, mm, a, repeat): string {
    let copyDays = days.concat([]);
    const todaysDayNo = new Date().getDay();
    const currentDay = copyDays[todaysDayNo];
    if (repeat.includes(currentDay)) {
      return moment(
        `${moment().format('dddd')} ${hh}:${mm}:00:${a}`,
        'dddd hh:mm:ss:a',
        true
      ).format();
    } else {
      const nextDay = this.getNextDay(repeat, copyDays);
      const nextDateWillBe = days.findIndex((day) => day === nextDay) + 1;
      const nextMoment = moment().add(nextDateWillBe, 'days');
      nextMoment.hour(a === 'PM' ? this.parsePM(+hh) : this.parseAM(+hh));
      nextMoment.minute(+mm);
      nextMoment.second(0);
      return nextMoment.format();
    }
  }

  parsePM(hour: number) {
    if (hour === 12) return hour;
    return hour + 12;
  }

  parseAM(hour: number) {
    if (hour === 12) return 24;
    return hour;
  }

  getNextDay(repeat, copyDays) {
    for (let i = 0; i < copyDays.length; i++) {
      if (repeat.includes(copyDays[i])) {
        return copyDays[i];
      }
    }
  }

  invokeAlarm(datetime: Date) {
    const hh = datetime.getHours();
    const mm = datetime.getMinutes();
    this.listOfAlarm.forEach((alarm) => {
      const date = moment(alarm.nextTrigger).toDate();
      if (alarm) {
        if (
          hh ===
            (alarm.periods === 'PM'
              ? this.parsePM(+alarm.hour)
              : this.parseAM(+alarm.hour)) &&
          parseInt(alarm.minute) === mm &&
          alarm.status &&
          date.toDateString() === moment(datetime).toDate().toDateString()
        ) {
          this.dbService.updateNextTrigger(
            alarm.id,
            this.createNextTrigger(
              alarm.hour,
              +alarm.minute - 2,
              alarm.periods,
              alarm.repeat
            )
          );
          this.queueAlarm();
          this.invokeAlarmPop.next(alarm)
        }
      }
    });
  }

  updateMinute(id,min) {
    this.dbService.updateMinutes(id,min);
  }
}
