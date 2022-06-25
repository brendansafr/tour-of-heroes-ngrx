import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

import { HeroService } from '../hero.service';

import { Hero } from '../hero';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  isEmpty: boolean = false;
  isLoading$ = this.service.isLoading$;

  heroes$: Observable<Hero[]> = this.service.getHeroes$().pipe(
    map((h) => h.slice(1, 5)),
    tap((b) => {
      if (b == []) {
        this.isEmpty = true;
      }
    })
  );

  constructor(public service: HeroService) {}
}
