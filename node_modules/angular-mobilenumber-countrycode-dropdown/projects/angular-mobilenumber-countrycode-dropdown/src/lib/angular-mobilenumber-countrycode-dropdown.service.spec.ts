import {async, TestBed} from '@angular/core/testing';

import { AngularMobilenumberCountrycodeDropdownService } from './angular-mobilenumber-countrycode-dropdown.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AngularMobilenumberCountrycodeDropdownService', () => {
  // beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  }));
  it('should be created', () => {
    const service: AngularMobilenumberCountrycodeDropdownService = TestBed.get(AngularMobilenumberCountrycodeDropdownService);
    expect(service).toBeTruthy();
  });
});
