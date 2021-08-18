import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoCodeManagementComponent } from './promo-code-management.component';

describe('PromoCodeManagementComponent', () => {
  let component: PromoCodeManagementComponent;
  let fixture: ComponentFixture<PromoCodeManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromoCodeManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoCodeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
