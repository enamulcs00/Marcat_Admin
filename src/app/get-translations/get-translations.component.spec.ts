import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetTranslationsComponent } from './get-translations.component';

describe('GetTranslationsComponent', () => {
  let component: GetTranslationsComponent;
  let fixture: ComponentFixture<GetTranslationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetTranslationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetTranslationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
