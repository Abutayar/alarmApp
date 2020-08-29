import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router

//Components
import { DigitalClockScreenComponent } from './screens/digital-clock-screen/digital-clock-screen.component';
import { AlarmListComponent } from './screens/alarm-list/alarm-list.component';
import { EditNDeleteAlarmsComponent } from './screens/edit-n-delete-alarms/edit-n-delete-alarms.component';
import { AddNEditAlarmComponent } from './screens/add-n-edit-alarm/add-n-edit-alarm.component';
import { PlayAlarmComponent } from './screens/play-alarm/play-alarm.component';

// Guard
import { EditGuard } from './_guard/edit-guard.service';

const routes: Routes = [
  { path: 'alarm-list', component: AlarmListComponent },
  { path: 'alarm-edit', component: EditNDeleteAlarmsComponent },
  { path: 'alarm-add', component: AddNEditAlarmComponent },
  {
    path: 'alarm-edit/:id',
    component: AddNEditAlarmComponent,
    canActivate: [EditGuard],
  },
  { path: '', component: DigitalClockScreenComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '/' },
  //{path:'play-alarm', component: PlayAlarmComponent}
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[EditGuard]
})
export class AppRoutingModule {}
