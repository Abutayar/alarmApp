import { Component } from '@angular/core';
import { AlarmService } from './_services/alarm-service/alarm.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'alarmApp';
  constructor(public alarmService: AlarmService) {
    this.alarmService.queueAlarm();
  }

  routeChange() {
    this.alarmService.queueAlarm();

  }
}
