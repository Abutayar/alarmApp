export interface DBInterface {
  [id: string]: DBInsertInterface
}

export interface DBInsertInterface {
  id?: number;
  label: string;
  repeat: Array<daysInterface>;
  snooze: boolean;
  hour: string;
  minute: string;
  periods: 'AM' | 'PM';
  sound: 'None' | 'Radar' | 'Beep';
  status: boolean;
  nextTrigger: string;
}

export interface DBUpdateInterface {
  label?: string;
  repeat?: Array<daysInterface>;
  snooze?: boolean;
  hour?: string;
  minute?: string;
  periods?: 'AM' | 'PM';
  sound?: 'None' | 'Radar' | 'Beep';
  status?: boolean;
}

export interface DBAlarmModel {
  label: string;
  repeat: {
    'Sunday' :boolean,
   'Monday':boolean,
  'Tuesday':boolean,
   'Wednesday':boolean,
   'Thursday':boolean,
   'Friday':boolean,
   'Saturday':boolean,
  };
  snooze: boolean;
  hour: string;
  minute: string;
  periods: 'AM' | 'PM';
  sound: 'None' | 'Radar' | 'Beep';
}

export type daysInterface =
  | 'Sunday'
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday';

