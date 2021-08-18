import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEndormentComponent } from './admin-endorment.component';

describe('AdminEndormentComponent', () => {
  let component: AdminEndormentComponent;
  let fixture: ComponentFixture<AdminEndormentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEndormentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEndormentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
