import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerprivacypolicyComponent } from './consumerprivacypolicy.component';

describe('ConsumerprivacypolicyComponent', () => {
  let component: ConsumerprivacypolicyComponent;
  let fixture: ComponentFixture<ConsumerprivacypolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerprivacypolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerprivacypolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
