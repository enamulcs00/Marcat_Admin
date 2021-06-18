import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdiscountComponent } from './editdiscount.component';

describe('EditdiscountComponent', () => {
  let component: EditdiscountComponent;
  let fixture: ComponentFixture<EditdiscountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditdiscountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditdiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
