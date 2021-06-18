import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesgraphComponent } from './salesgraph.component';

describe('SalesgraphComponent', () => {
  let component: SalesgraphComponent;
  let fixture: ComponentFixture<SalesgraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesgraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesgraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
