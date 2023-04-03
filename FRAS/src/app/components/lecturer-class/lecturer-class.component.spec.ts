import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturerClassComponent } from './lecturer-class.component';

describe('LecturerClassComponent', () => {
  let component: LecturerClassComponent;
  let fixture: ComponentFixture<LecturerClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LecturerClassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LecturerClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
