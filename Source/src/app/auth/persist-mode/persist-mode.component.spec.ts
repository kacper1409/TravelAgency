import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersistModeComponent } from './persist-mode.component';

describe('PersistModeComponent', () => {
  let component: PersistModeComponent;
  let fixture: ComponentFixture<PersistModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersistModeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersistModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
