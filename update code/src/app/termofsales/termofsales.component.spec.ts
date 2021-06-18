import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermofsalesComponent } from './termofsales.component';

describe('TermofsalesComponent', () => {
  let component: TermofsalesComponent;
  let fixture: ComponentFixture<TermofsalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermofsalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermofsalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
