import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarrantypolicyComponent } from './warrantypolicy.component';

describe('WarrantypolicyComponent', () => {
  let component: WarrantypolicyComponent;
  let fixture: ComponentFixture<WarrantypolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarrantypolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarrantypolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
