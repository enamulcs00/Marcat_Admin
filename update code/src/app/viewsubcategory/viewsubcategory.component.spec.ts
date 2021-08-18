import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsubcategoryComponent } from './viewsubcategory.component';

describe('ViewsubcategoryComponent', () => {
  let component: ViewsubcategoryComponent;
  let fixture: ComponentFixture<ViewsubcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewsubcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewsubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
