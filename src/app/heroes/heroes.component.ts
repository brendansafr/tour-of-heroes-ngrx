import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { BehaviorSubject, finalize, Observable, of, tap } from 'rxjs';

import { HeroService } from '../hero.service';
import { LoadingService } from '../loading.service';

import { Hero } from '../hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroesComponent implements OnInit {
  loadIndicator: number = 0;

  heroesSubject: BehaviorSubject<Hero[]> = new BehaviorSubject<Hero[]>([]);
  heroes$: Observable<Hero[]> = this.heroesSubject.asObservable();

  constructor(
    public heroService: HeroService,
    public loadingService: LoadingService
  ) {}

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.loadingService.setLoadIndicator(this.loadIndicator, true);
    this.heroService
      .addHero({ name } as Hero)
      .pipe(
        finalize(() => {
          this.loadingService.setLoadIndicator(this.loadIndicator, false);
          this.refresh();
        })
      )
      .subscribe();
  }

  delete(hero: Hero): void {
    this.loadingService.setLoadIndicator(this.loadIndicator, true);
    this.heroService
      .deleteHero(hero.id)
      .pipe(
        finalize(() => {
          this.loadingService.setLoadIndicator(this.loadIndicator, false);
          this.refresh();
        })
      )
      .subscribe();
  }

  refresh(): void {
    this.loadingService.setLoadIndicator(this.loadIndicator, true);

    this.heroService.refresh(() => {
      this.loadingService.setLoadIndicator(this.loadIndicator, false);
    });
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe((h) => {
      this.heroesSubject.next(h);
    });
  }

  ngOnInit(): void {
    this.getHeroes();
  }
}
