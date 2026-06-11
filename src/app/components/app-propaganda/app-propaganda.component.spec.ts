import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPropagandaComponent } from './app-propaganda.component';

describe('AppPropagandaComponent', () => {
  let component: AppPropagandaComponent;
  let fixture: ComponentFixture<AppPropagandaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppPropagandaComponent]
    });
    fixture = TestBed.createComponent(AppPropagandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
