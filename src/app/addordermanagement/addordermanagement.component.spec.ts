import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddordermanagementComponent } from './addordermanagement.component';

describe('AddordermanagementComponent', () => {
  let component: AddordermanagementComponent;
  let fixture: ComponentFixture<AddordermanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddordermanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddordermanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
