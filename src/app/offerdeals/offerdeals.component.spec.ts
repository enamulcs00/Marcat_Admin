import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferdealsComponent } from './offerdeals.component';

describe('OfferdealsComponent', () => {
  let component: OfferdealsComponent;
  let fixture: ComponentFixture<OfferdealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferdealsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferdealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
