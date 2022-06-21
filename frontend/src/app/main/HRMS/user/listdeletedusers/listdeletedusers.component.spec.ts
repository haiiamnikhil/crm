import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListdeletedusersComponent } from './listdeletedusers.component';

describe('ListdeletedusersComponent', () => {
  let component: ListdeletedusersComponent;
  let fixture: ComponentFixture<ListdeletedusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListdeletedusersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListdeletedusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
