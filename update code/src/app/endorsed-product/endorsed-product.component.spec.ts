import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndorsedProductComponent } from './endorsed-product.component';

describe('EndorsedProductComponent', () => {
  let component: EndorsedProductComponent;
  let fixture: ComponentFixture<EndorsedProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndorsedProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndorsedProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
