import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialDeUsoComponent } from './tutorial-de-uso.component';

describe('TutorialDeUsoComponent', () => {
  let component: TutorialDeUsoComponent;
  let fixture: ComponentFixture<TutorialDeUsoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TutorialDeUsoComponent]
    });
    fixture = TestBed.createComponent(TutorialDeUsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
