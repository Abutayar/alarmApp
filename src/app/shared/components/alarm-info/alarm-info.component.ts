import { Component, OnInit, Input } from '@angular/core';
import { scheduledConfig } from '../../data/data.shared';

@Component({
  selector: 'app-alarm-info',
  templateUrl: './alarm-info.component.html',
  styleUrls: ['./alarm-info.component.css'],
})
export class AlarmInfoComponent implements OnInit {
  @Input() label: string;
  @Input() days: Array<string>;
  @Input() hh: string;
  @Input() mm: string;
  @Input() periods: string;
  scheduledFor: string = '';
  constructor() {}

  ngOnInit(): void {
    if (this.days) {
      this.findScheduledFor();
    }
  }

  findScheduledFor() {
    const configs = scheduledConfig;
    for (let config of configs) {
      let has = config.has;
      if (has.length !== this.days.length) continue;
      if (this.days.every((day) => has.includes(day))) {
        this.scheduledFor += `${config.returnValue}`;
        return; // so that no further execution
      }
    }

    // below code to manage if alternate days
    this.days.map((day) => {
      const length = this.days.length;
      switch (length) {
        case 1:
        case 2:
          this.scheduledFor += `${day} `;
          break;
        case 3:
          this.scheduledFor += `${day.slice(0, 3)} `;
          break;
        default:
          this.scheduledFor += `${day.slice(0, 2)} `;
          break;
      }
    });

  }
}
