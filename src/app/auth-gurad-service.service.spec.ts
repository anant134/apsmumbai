import { TestBed } from '@angular/core/testing';

import { AuthGuradServiceService } from './auth-gurad-service.service';

describe('AuthGuradServiceService', () => {
  let service: AuthGuradServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGuradServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
