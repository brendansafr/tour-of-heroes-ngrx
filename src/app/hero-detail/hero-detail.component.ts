import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { HeroService } from '../hero.service';

import { Hero } from '../hero';
import { Subscription, tap, BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
})
export class HeroDetailComponent implements OnInit, OnDestroy {
  @Input() hero?: Hero;

  private _isEmpty: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  isEmpty$: Observable<boolean> = this._isEmpty.asObservable();
  isLoading$ = this._service.isLoading$;

  private _subscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private _service: HeroService
  ) {}

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      this._service.updateHero(this.hero).subscribe();
    }
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this._subscription = this._service.getHero(id).subscribe((h) => {
      if (h == null) {
        this._isEmpty.next(true);
      } else {
        this._isEmpty.next(false);
        this.hero = h;
      }
    });
  }

  // ng

  ngOnInit(): void {
    this.getHero();
  }

  ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }
}
