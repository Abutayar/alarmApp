import { Component, OnInit, Input } from '@angular/core';
import { AlarmService } from 'src/app/_services/alarm-service/alarm.service';
import * as moment from 'moment';

@Component({
  selector: 'app-play-alarm',
  templateUrl: './play-alarm.component.html',
  styleUrls: ['./play-alarm.component.css'],
})
export class PlayAlarmComponent implements OnInit {
  @Input() label: string = '';
  @Input() sound: string;
  audio: HTMLAudioElement;
  @Input() id: string;
  @Input() isSnooze: boolean;
  constructor(private alarmService: AlarmService) {}

  ngOnInit(): void {
    this.audio = this.alarmService.playAudio(this.sound, 0);
    this.audio.addEventListener(
      'ended',
      function () {
        this.currentTime = 0;
        this.play();
      },
      false
    );

    setTimeout(() => {
      if (this.isSnooze) {
        this.snooze();
      } else {
        this.stop();
      }
    }, 60000);
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.alarmService.invokeAlarmPop.next(null);
    this.alarmService.updateMinute(
      this.id,
      moment().subtract(2, 'minute').minute()
    );
  }

  snooze() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.alarmService.invokeAlarmPop.next(null);
    this.alarmService.updateMinute(
      this.id,
      moment().add(10, 'minute').minute()
    );
  }
}
