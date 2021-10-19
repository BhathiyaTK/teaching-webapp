import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherShowMoreLessComponent } from './teacher-show-more-less.component';

describe('TeacherShowMoreLessComponent', () => {
  let component: TeacherShowMoreLessComponent;
  let fixture: ComponentFixture<TeacherShowMoreLessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherShowMoreLessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherShowMoreLessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
