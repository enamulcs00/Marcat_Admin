import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentorTComponent } from './ventor-t.component';

describe('VentorTComponent', () => {
  let component: VentorTComponent;
  let fixture: ComponentFixture<VentorTComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentorTComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentorTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
