import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

//Components
import { AppComponent } from './app.component';
import { DigitalClockComponent } from './shared/components/digital-clock/digital-clock.component';
import { DigitalClockScreenComponent } from './screens/digital-clock-screen/digital-clock-screen.component';
import { AlarmInfoComponent } from './shared/components/alarm-info/alarm-info.component';
import { AlarmListComponent } from './screens/alarm-list/alarm-list.component';
import { EditNDeleteAlarmsComponent } from './screens/edit-n-delete-alarms/edit-n-delete-alarms.component';
import { AddNEditAlarmComponent } from './screens/add-n-edit-alarm/add-n-edit-alarm.component';
import { PlayAlarmComponent } from './screens/play-alarm/play-alarm.component';

@NgModule({
  declarations: [
    AppComponent,
    DigitalClockComponent,
    DigitalClockScreenComponent,
    AlarmInfoComponent,
    AlarmListComponent,
    EditNDeleteAlarmsComponent,
    AddNEditAlarmComponent,
    PlayAlarmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
