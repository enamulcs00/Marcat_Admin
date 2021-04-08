import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularMobilenumberCountrycodeDropdownComponent } from './angular-mobilenumber-countrycode-dropdown.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AngularMobilenumberCountrycodeDropdownComponent', () => {
  let component: AngularMobilenumberCountrycodeDropdownComponent;
  let fixture: ComponentFixture<AngularMobilenumberCountrycodeDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ AngularMobilenumberCountrycodeDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularMobilenumberCountrycodeDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

/*  it('should have getData function', () => {
    const service: AngularMobilenumberCountrycodeDropdownComponent = TestBed.get(component);
    expect(service.getJsonData.prototype).toBeTruthy();
  });*/
});
