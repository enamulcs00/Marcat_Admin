import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenderManagementComponent } from './vender-management.component';

describe('VenderManagementComponent', () => {
  let component: VenderManagementComponent;
  let fixture: ComponentFixture<VenderManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenderManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenderManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
