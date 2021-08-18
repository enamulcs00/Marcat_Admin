import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCelebrityComponent } from './manage-celebrity.component';

describe('ManageCelebrityComponent', () => {
  let component: ManageCelebrityComponent;
  let fixture: ComponentFixture<ManageCelebrityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCelebrityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCelebrityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
