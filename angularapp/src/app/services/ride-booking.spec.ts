import { TestBed } from '@angular/core/testing';

import { Ridebooking } from './ride-booking';

describe('Ridebooking', () => {
  let service: Ridebooking;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ridebooking);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
