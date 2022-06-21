import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicsettingsComponent } from './basicsettings.component';

describe('BasicsettingsComponent', () => {
  let component: BasicsettingsComponent;
  let fixture: ComponentFixture<BasicsettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicsettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
