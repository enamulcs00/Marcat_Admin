import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEndorsementComponent } from './add-endorsement.component';

describe('AddEndorsementComponent', () => {
  let component: AddEndorsementComponent;
  let fixture: ComponentFixture<AddEndorsementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEndorsementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEndorsementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
