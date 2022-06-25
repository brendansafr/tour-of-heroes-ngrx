import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, finalize } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { LogService } from './log/log.service';

import { Hero } from './hero';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private _heroesUrl = 'api/heroes'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  // Cache

  private _isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public isLoading$: Observable<boolean> = this._isLoading.asObservable();

  private _heroes: BehaviorSubject<Hero[]> = new BehaviorSubject<Hero[]>([]);
  private _isHeroesValid: boolean = false;

  constructor(private _http: HttpClient, private _logService: LogService) {}

  // Methods

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    const url = `${this._heroesUrl}/${id}`;

    this._isLoading.next(true);

    return this._http.get<Hero>(url).pipe(
      tap(() => {
        this._logService.postLog(`fetched hero id=${id}`);
      }),
      catchError(this._handleError<Hero>(`getHero id=${id}`)),
      finalize(() => {
        this._isLoading.next(false);
      })
    );
  }

  /** GET heroes from the server */
  private _getHeroes(): void {
    this._isLoading.next(true);

    this._http
      .get<Hero[]>(this._heroesUrl)
      .pipe(
        tap((_) => this._logService.postLog('fetched heroes')),
        catchError(this._handleError<Hero[]>('_getHeroes', [])),
        finalize(() => {
          this._isLoading.next(false);
        })
      )
      .subscribe((h) => {
        this._isHeroesValid = true;
        this._heroes.next(h);
      });
  }

  getHeroes$(): Observable<Hero[]> {
    if (!this._isHeroesValid) {
      this._getHeroes();
    }
    return this._heroes.asObservable();
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    this._isLoading.next(true);

    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this._http.get<Hero[]>(`${this._heroesUrl}/?name=${term}`).pipe(
      tap((x) => {
        x.length
          ? this._logService.postLog(`found heroes matching "${term}"`)
          : this._logService.postLog(`no heroes matching "${term}"`);
      }),
      catchError(this._handleError<Hero[]>('searchHeroes', [])),
      finalize(() => {
        this._isLoading.next(false);
      })
    );
  }

  /** POST: add a new hero to the server */
  addHero(hero: Hero): Observable<Hero> {
    this._isLoading.next(true);

    return this._http.post<Hero>(this._heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => {
        this._isLoading.next(false);

        this._logService.postLog(`added hero w/ id=${newHero.id}`);
      }),

      finalize(() => {
        this.refresh();
      }),
      catchError(this._handleError<Hero>('addHero'))
    );
  }

  /** PUT: update the hero on the server */
  updateHero(hero: Hero): Observable<any> {
    this._isLoading.next(true);

    return this._http.put(this._heroesUrl, hero, this.httpOptions).pipe(
      tap(() => {
        this._isLoading.next(false);

        this._logService.postLog(`updated hero id=${hero.id}`);
      }),
      catchError(this._handleError<any>('updateHero'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteHero(id: number): Observable<Hero> {
    const url = `${this._heroesUrl}/${id}`;

    this._isLoading.next(true);

    return this._http.delete<Hero>(url, this.httpOptions).pipe(
      tap((_) => {
        this._isLoading.next(true);
        this._logService.postLog(`deleted hero id=${id}`);
      }),
      catchError(this._handleError<Hero>('deleteHero')),
      finalize(() => {
        this.refresh();
      })
    );
  }

  refresh(): void {
    this._getHeroes();
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  _handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this._logService.postLog(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
