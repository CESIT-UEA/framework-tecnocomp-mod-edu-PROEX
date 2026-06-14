import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatPersonalizadoComponent } from './chat-personalizado.component';

describe('ChatPersonalizadoComponent', () => {
  let component: ChatPersonalizadoComponent;
  let fixture: ComponentFixture<ChatPersonalizadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatPersonalizadoComponent]
    });
    fixture = TestBed.createComponent(ChatPersonalizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
