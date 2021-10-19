import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TchrAddClassComponent } from './tchr-add-class.component';

describe('TchrAddClassComponent', () => {
  let component: TchrAddClassComponent;
  let fixture: ComponentFixture<TchrAddClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TchrAddClassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TchrAddClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
