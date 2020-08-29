import { Component, OnInit } from '@angular/core';
import { DbServiceService } from 'src/app/_services/db-service/db-service.service';
import { AlarmService } from 'src/app/_services/alarm-service/alarm.service';
@Component({
  selector: 'app-alarm-list',
  templateUrl: './alarm-list.component.html',
  styleUrls: ['./alarm-list.component.css'],
})
export class AlarmListComponent implements OnInit {
  constructor(
    private dbService: DbServiceService,
    public alarmService: AlarmService
  ) {}

  ngOnInit(): void {}

  updateStatus(id,status: boolean) {
    this.dbService.updateStatus(id,!status)
  }
}
