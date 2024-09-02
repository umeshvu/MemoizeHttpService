import { TestBed } from '@angular/core/testing';

import { MemoizeHttpService } from './memoize-http.service';

describe('MemoizeHttpService', () => {
  let service: MemoizeHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemoizeHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
