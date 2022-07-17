import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQuizQuetionsComponent } from './view-quiz-quetions.component';

describe('ViewQuizQuetionsComponent', () => {
  let component: ViewQuizQuetionsComponent;
  let fixture: ComponentFixture<ViewQuizQuetionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewQuizQuetionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewQuizQuetionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
