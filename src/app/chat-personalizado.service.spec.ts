import { TestBed } from '@angular/core/testing';

import { ChatPersonalizadoService } from './chat-personalizado.service';

describe('ChatPersonalizadoService', () => {
  let service: ChatPersonalizadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatPersonalizadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
