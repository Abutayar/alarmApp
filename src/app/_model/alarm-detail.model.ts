import { DBAlarmModel } from '../_interfaces/db.interface';

export class AlarmModel implements DBAlarmModel {
  constructor(
    public label: string,
    public repeat: { Sunday: boolean; Monday: boolean; Tuesday: boolean; Wednesday: boolean; Thursday: boolean; Friday: boolean; Saturday: boolean; },
    public snooze: boolean,
    public hour: string,
    public minute: string,
    public periods: 'AM' | 'PM',
    public sound: 'None' | 'Radar' | 'Beep'
  ) {}
}


/* */
