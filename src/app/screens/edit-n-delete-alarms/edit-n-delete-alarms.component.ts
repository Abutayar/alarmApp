import { Component, OnInit } from '@angular/core';
import { DbServiceService } from 'src/app/_services/db-service/db-service.service';
import { AlarmService } from 'src/app/_services/alarm-service/alarm.service';

@Component({
  selector: 'app-edit-n-delete-alarms',
  templateUrl: './edit-n-delete-alarms.component.html',
  styleUrls: ['./edit-n-delete-alarms.component.css']
})
export class EditNDeleteAlarmsComponent implements OnInit {
  constructor(
    private dbService: DbServiceService,
    public alarmService: AlarmService
  ) {
   }

  ngOnInit(): void {
  }

  delete(id: string) {
    this.dbService.delete(id);
    this.alarmService.queueAlarm();
  }

}
