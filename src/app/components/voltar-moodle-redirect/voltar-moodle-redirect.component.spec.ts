import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoltarMoodleRedirectComponent } from './voltar-moodle-redirect.component';

describe('VoltarMoodleRedirectComponent', () => {
  let component: VoltarMoodleRedirectComponent;
  let fixture: ComponentFixture<VoltarMoodleRedirectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VoltarMoodleRedirectComponent]
    });
    fixture = TestBed.createComponent(VoltarMoodleRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
