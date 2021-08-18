import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndorsementProductComponent } from './endorsement-product.component';

describe('EndorsementProductComponent', () => {
  let component: EndorsementProductComponent;
  let fixture: ComponentFixture<EndorsementProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndorsementProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndorsementProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
