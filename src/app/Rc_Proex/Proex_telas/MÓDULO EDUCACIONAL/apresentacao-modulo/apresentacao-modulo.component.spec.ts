import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApresentacaoModuloComponent } from './apresentacao-modulo.component';

describe('ApresentacaoModuloComponent', () => {
  let component: ApresentacaoModuloComponent;
  let fixture: ComponentFixture<ApresentacaoModuloComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApresentacaoModuloComponent]
    });
    fixture = TestBed.createComponent(ApresentacaoModuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
