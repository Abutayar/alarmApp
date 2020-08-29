import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNDeleteAlarmsComponent } from './edit-n-delete-alarms.component';

describe('EditNDeleteAlarmsComponent', () => {
  let component: EditNDeleteAlarmsComponent;
  let fixture: ComponentFixture<EditNDeleteAlarmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditNDeleteAlarmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNDeleteAlarmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
