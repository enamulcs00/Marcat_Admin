import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpWithMobileComponent } from './sign-up-with-mobile.component';

describe('SignUpWithMobileComponent', () => {
  let component: SignUpWithMobileComponent;
  let fixture: ComponentFixture<SignUpWithMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpWithMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpWithMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
