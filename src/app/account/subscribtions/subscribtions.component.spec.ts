import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribtionsComponent } from './subscribtions.component';

describe('SubscribtionsComponent', () => {
  let component: SubscribtionsComponent;
  let fixture: ComponentFixture<SubscribtionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscribtionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribtionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
