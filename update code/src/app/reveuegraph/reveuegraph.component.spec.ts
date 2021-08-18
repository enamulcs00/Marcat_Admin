import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReveuegraphComponent } from './reveuegraph.component';

describe('ReveuegraphComponent', () => {
  let component: ReveuegraphComponent;
  let fixture: ComponentFixture<ReveuegraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReveuegraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReveuegraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
