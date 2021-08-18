import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewdiscountComponent } from './viewdiscount.component';

describe('ViewdiscountComponent', () => {
  let component: ViewdiscountComponent;
  let fixture: ComponentFixture<ViewdiscountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewdiscountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewdiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
