import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalReadMoreLessComponent } from './approval-read-more-less.component';

describe('ApprovalReadMoreLessComponent', () => {
  let component: ApprovalReadMoreLessComponent;
  let fixture: ComponentFixture<ApprovalReadMoreLessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovalReadMoreLessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalReadMoreLessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
