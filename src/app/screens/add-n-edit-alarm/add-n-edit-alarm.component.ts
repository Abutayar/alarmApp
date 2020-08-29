import { Component, OnInit } from '@angular/core';
import { AlarmModel } from '../../_model/alarm-detail.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AlarmService } from '../../_services/alarm-service/alarm.service';

//Interface
import {
  DBInsertInterface,
  daysInterface,
} from '../../_interfaces/db.interface';
import { DbServiceService } from 'src/app/_services/db-service/db-service.service';

@Component({
  selector: 'app-add-n-edit-alarm',
  templateUrl: './add-n-edit-alarm.component.html',
  styleUrls: ['./add-n-edit-alarm.component.css'],
})
export class AddNEditAlarmComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private dbService: DbServiceService,
    private alarmService: AlarmService,
    private router: Router
  ) {}
  hours = [...range(1, 12)].map((eachNo) =>
    ('' + eachNo).length === 1 ? '0' + eachNo : eachNo
  );
  minutes = [...range(0, 59)].map((eachNo) =>
    ('' + eachNo).length === 1 ? '0' + eachNo : eachNo
  );
  daysDefault = {
    Sunday: false,
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
  };
  sounds = ['None', 'Radar', 'Beep'];
  model = new AlarmModel('', this.daysDefault, true, '12', '00', 'AM', 'None');
  objectKey = Object.keys;
  public editId = this.route.snapshot.params.id;
  ngOnInit(): void {
    if (this.editId) {
      const temp = this.dbService.getAlarmMetaById(this.editId);
      this.model = new AlarmModel(
        temp.label,
        this.createRepeatObject(temp.repeat),
        temp.snooze,
        temp.hour,
        temp.minute,
        temp.periods,
        temp.sound
      );
    }
  }

  onSubmit(): void {
    const repeat = this.createRepeatArray();
    if (!repeat.length) return;
    const alarmMeta: DBInsertInterface = {
      hour: this.model.hour,
      minute: this.model.minute,
      periods: this.model.periods,
      snooze: this.model.snooze,
      label: this.model.label,
      repeat: repeat,
      sound: this.model.sound,
      status: true,
      nextTrigger: this.alarmService.createNextTrigger(
        this.model.hour,
        this.model.minute,
        this.model.periods,
        this.createRepeatArray()
      ),
    };
    if (this.editId) {
      this.dbService.update(this.editId, alarmMeta);
    } else {
      this.dbService.insert(alarmMeta);
    }

    this.router.navigate(['/', 'alarm-list']);
  }

  createRepeatArray(): Array<daysInterface> {
    const repeat: Array<daysInterface> = [];
    for (let key in this.model.repeat) {
      if (this.model.repeat[key]) {
        repeat.push(<daysInterface>key);
      }
    }
    return repeat;
  }

  createRepeatObject(repeat: Array<daysInterface>) {
    for (let day in this.daysDefault) {
      if (repeat.includes(<daysInterface>day)) {
        this.daysDefault[day] = true;
      }
    }
    return this.daysDefault;
  }

  delete(id: string) {
    this.dbService.delete(id);
    this.router.navigate(['/', 'alarm-list']);
  }

  playSound(sound: string): void {
    this.alarmService.playAudio(sound, 800);
  }
}

function* range(a, b) {
  for (let i = a; i <= b; ++i) yield i;
}
