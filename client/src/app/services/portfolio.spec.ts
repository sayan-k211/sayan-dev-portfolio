import { TestBed } from '@angular/core/testing';

import { Portfolio } from './portfolio';

describe('Portfolio', () => {
  let service: Portfolio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Portfolio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
