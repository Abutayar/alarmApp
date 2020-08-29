import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayAlarmComponent } from './play-alarm.component';

describe('PlayAlarmComponent', () => {
  let component: PlayAlarmComponent;
  let fixture: ComponentFixture<PlayAlarmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayAlarmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayAlarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
