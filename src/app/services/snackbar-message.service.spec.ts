import { TestBed, inject } from '@angular/core/testing';

import { SnackbarMessageService } from './snackbar-message.service';

describe('SnackbarMessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SnackbarMessageService]
    });
  });

  it('should be created', inject([SnackbarMessageService], (service: SnackbarMessageService) => {
    expect(service).toBeTruthy();
  }));
});
