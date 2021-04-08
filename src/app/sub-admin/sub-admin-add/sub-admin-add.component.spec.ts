import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAdminAddComponent } from './sub-admin-add.component';

describe('SubAdminAddComponent', () => {
  let component: SubAdminAddComponent;
  let fixture: ComponentFixture<SubAdminAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubAdminAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubAdminAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
