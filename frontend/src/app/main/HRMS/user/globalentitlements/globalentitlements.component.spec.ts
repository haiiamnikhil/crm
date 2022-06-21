import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalentitlementsComponent } from './globalentitlements.component';

describe('GlobalentitlementsComponent', () => {
  let component: GlobalentitlementsComponent;
  let fixture: ComponentFixture<GlobalentitlementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalentitlementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalentitlementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
