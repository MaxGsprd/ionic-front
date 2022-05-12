import { TestBed } from '@angular/core/testing';


import {HttpInterceptors} from "./http.interceptor";

describe('HttpInterceptors', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpInterceptors
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpInterceptors = TestBed.inject(HttpInterceptors);
    expect(interceptor).toBeTruthy();
  });
});
