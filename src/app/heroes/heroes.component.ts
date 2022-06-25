import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { BehaviorSubject, finalize, Observable, of, tap } from 'rxjs';

import { HeroService } from '../hero.service';

import { Hero } from '../hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroesComponent {
  isEmpty: boolean = false;
  isLoading$ = this._service.isLoading$;

  loadIndicator: number = 0;

  heroes$: Observable<Hero[]> = this._service.getHeroes$();

  constructor(private _service: HeroService) {}

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this._service.addHero({ name } as Hero).subscribe();
  }

  delete(hero: Hero): void {
    this._service.deleteHero(hero.id).subscribe();
  }

  refresh(): void {
    this._service.refresh();
  }
}
