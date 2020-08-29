import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalClockScreenComponent } from './digital-clock-screen.component';

describe('DigitalClockScreenComponent', () => {
  let component: DigitalClockScreenComponent;
  let fixture: ComponentFixture<DigitalClockScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigitalClockScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalClockScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
