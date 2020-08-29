import { scheduled } from 'rxjs';

export const months = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];

export const shortMonths = months.map(el => el.slice(0,3));

export const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const shortDays = days.map(el => el.slice(0,3));

export const weekdays = days.slice(1,6);

export const weekends = [days[0],days[6]];

export const scheduledConfig = [
  {
    has: weekdays,
    returnValue: "Weekdays"
  },
  {
    has: weekends,
    returnValue: "Weekends"
  },
  {
    has: days,
    returnValue: "Everyday"
  },
]
