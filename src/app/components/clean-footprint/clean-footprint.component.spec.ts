import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CleanFootprintComponent } from './clean-footprint.component';

describe('CleanFootprintComponent', () => {
  let component: CleanFootprintComponent;
  let fixture: ComponentFixture<CleanFootprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CleanFootprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CleanFootprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
