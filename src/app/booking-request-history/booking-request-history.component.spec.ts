import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingRequestHistoryComponent } from './booking-request-history.component';

describe('BookingRequestHistoryComponent', () => {
  let component: BookingRequestHistoryComponent;
  let fixture: ComponentFixture<BookingRequestHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingRequestHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingRequestHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
