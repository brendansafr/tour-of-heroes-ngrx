import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HeroService } from '../hero.service';

import { Hero } from '../hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroesComponent implements OnInit {
  heroes$: Observable<Hero[]> = of([]);

  constructor(private heroService: HeroService) {}

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({ name } as Hero).subscribe();
  }

  delete(hero: Hero): void {
    this.heroService.deleteHero(hero.id).subscribe();
  }

  ngOnInit(): void {
    this.heroes$ = this.heroService.getHeroes();
  }
}
