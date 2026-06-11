import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialInstalacaoComponent } from './tutorial-instalacao.component';

describe('TutorialInstalacaoComponent', () => {
  let component: TutorialInstalacaoComponent;
  let fixture: ComponentFixture<TutorialInstalacaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TutorialInstalacaoComponent]
    });
    fixture = TestBed.createComponent(TutorialInstalacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
