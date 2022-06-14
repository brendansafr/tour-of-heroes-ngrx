import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map, Observable, of } from 'rxjs';

import { HeroService } from '../hero.service';

import { Hero } from '../hero';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  heroes$: Observable<Hero[]> = of([]);

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.heroes$ = this.heroService.getHeroes().pipe(map((h) => h.slice(1, 5)));
  }
}
