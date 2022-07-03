import { TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';

import { HeroService } from './hero.service';

describe('HeroService', () => {
  let service: HeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(HeroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('exposes an #isLoading$ observable', (done: DoneFn) => {
    service.isLoading$.subscribe((value) => {
      expect(value).toBe(false);
      done();
    });
  });

  it('returns empty array if no heroes found', (done: DoneFn) => {
    service.getHeroes$().subscribe((value) => {
      expect(value).toBe([]);
      done();
    });
  });
});
