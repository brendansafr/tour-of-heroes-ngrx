import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { finalize, map, Observable, of } from 'rxjs';

import { HeroService } from '../hero.service';
import { LoadingService } from '../loading.service';

import { Hero } from '../hero';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  loadIndicator: number = 0;

  heroes$: Observable<Hero[]> = of([]);

  constructor(
    private heroService: HeroService,
    public loadingService: LoadingService
  ) {}

  getHeroes(): void {
    this.heroes$ = this.heroService
      .getHeroes$()
      .pipe(map((h) => h.slice(1, 5)));
  }

  ngOnInit(): void {
    this.getHeroes();
  }
}
