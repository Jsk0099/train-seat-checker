import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainSeatAvailabilityComponent } from './train-seat-availability.component';

describe('TrainSeatAvailabilityComponent', () => {
  let component: TrainSeatAvailabilityComponent;
  let fixture: ComponentFixture<TrainSeatAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainSeatAvailabilityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainSeatAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
