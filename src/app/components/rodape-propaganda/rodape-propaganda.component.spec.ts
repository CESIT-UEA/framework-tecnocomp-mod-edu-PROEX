import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RodapePropagandaComponent } from './rodape-propaganda.component';

describe('RodapePropagandaComponent', () => {
  let component: RodapePropagandaComponent;
  let fixture: ComponentFixture<RodapePropagandaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RodapePropagandaComponent]
    });
    fixture = TestBed.createComponent(RodapePropagandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
