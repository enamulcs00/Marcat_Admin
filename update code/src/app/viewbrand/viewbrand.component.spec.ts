import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewbrandComponent } from './viewbrand.component';

describe('ViewbrandComponent', () => {
  let component: ViewbrandComponent;
  let fixture: ComponentFixture<ViewbrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewbrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewbrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
