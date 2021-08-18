import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorSalesReportComponent } from './vendor-sales-report.component';

describe('VendorSalesReportComponent', () => {
  let component: VendorSalesReportComponent;
  let fixture: ComponentFixture<VendorSalesReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorSalesReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorSalesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
