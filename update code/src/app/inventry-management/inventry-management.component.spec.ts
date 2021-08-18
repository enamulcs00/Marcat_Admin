import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventryManagementComponent } from './inventry-management.component';

describe('InventryManagementComponent', () => {
  let component: InventryManagementComponent;
  let fixture: ComponentFixture<InventryManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventryManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventryManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
