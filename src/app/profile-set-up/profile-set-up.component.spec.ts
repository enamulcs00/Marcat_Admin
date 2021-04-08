import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSetUpComponent } from './profile-set-up.component';

describe('ProfileSetUpComponent', () => {
  let component: ProfileSetUpComponent;
  let fixture: ComponentFixture<ProfileSetUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileSetUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSetUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
