import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';

import { HeroService } from '../hero.service';

import { Hero } from '../hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroesComponent implements OnInit {
  loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  loading$: Observable<boolean> = this.loadingSubject
    .asObservable()
    .pipe(tap((loading) => console.log(loading)));

  heroesSubject: BehaviorSubject<Hero[]> = new BehaviorSubject<Hero[]>([]);
  heroes$: Observable<Hero[]> = this.heroesSubject.asObservable();

  constructor(private heroService: HeroService) {}

  add(name: string): void {
    this.loadingSubject.next(true);
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({ name } as Hero).subscribe();
    this.getHeroes();
  }

  delete(hero: Hero): void {
    this.loadingSubject.next(true);
    this.heroService.deleteHero(hero.id).subscribe();
    this.getHeroes();
  }

  refresh(): void {
    this.heroService.getHeroes();
  }

  getHeroes(): void {
    this.loadingSubject.next(true);
    this.heroService
      .Heroes$()
      .pipe(
        tap(() => {
          this.loadingSubject.next(false);
        })
      )
      .subscribe((h) => {
        this.heroesSubject.next(h);
      });
  }

  ngOnInit(): void {
    this.getHeroes();
  }
}
