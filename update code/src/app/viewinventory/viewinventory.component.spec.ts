import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewinventoryComponent } from './viewinventory.component';

describe('ViewinventoryComponent', () => {
  let component: ViewinventoryComponent;
  let fixture: ComponentFixture<ViewinventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewinventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewinventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
