import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNEditAlarmComponent } from './add-n-edit-alarm.component';

describe('AddNEditAlarmComponent', () => {
  let component: AddNEditAlarmComponent;
  let fixture: ComponentFixture<AddNEditAlarmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNEditAlarmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNEditAlarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
