import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, shareReplay, tap } from 'rxjs/operators';

import { MessageService } from './message.service';

import { Hero } from './hero';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private _heroesUrl = 'api/heroes'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  heroesSubject: BehaviorSubject<Hero[]> = new BehaviorSubject<Hero[]>([]);

  constructor(
    private _http: HttpClient,
    private _messageService: MessageService
  ) {}

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    const url = `${this._heroesUrl}/${id}`;
    return this._http.get<Hero>(url).pipe(
      tap((_) => this._log(`fetched hero id=${id}`)),
      catchError(this._handleError<Hero>(`getHero id=${id}`))
    );
  }

  /** GET heroes from the server */
  getHeroes(): void {
    this._http
      .get<Hero[]>(this._heroesUrl)
      .pipe(
        tap((_) => this._log('fetched heroes')),
        catchError(this._handleError<Hero[]>('getHeroes', []))
      )
      .subscribe((h) => this.heroesSubject.next(h));
  }

  Heroes$(): Observable<Hero[]> {
    return this.heroesSubject.asObservable();
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this._http.get<Hero[]>(`${this._heroesUrl}/?name=${term}`).pipe(
      tap((x) =>
        x.length
          ? this._log(`found heroes matching "${term}"`)
          : this._log(`no heroes matching "${term}"`)
      ),
      catchError(this._handleError<Hero[]>('searchHeroes', []))
    );
  }

  /** POST: add a new hero to the server */
  addHero(hero: Hero): Observable<Hero> {
    return this._http.post<Hero>(this._heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => {
        this._log(`added hero w/ id=${newHero.id}`);
        this.getHeroes();
      }),
      catchError(this._handleError<Hero>('addHero'))
    );
  }

  /** PUT: update the hero on the server */
  updateHero(hero: Hero): Observable<any> {
    return this._http.put(this._heroesUrl, hero, this.httpOptions).pipe(
      tap((_) => this._log(`updated hero id=${hero.id}`)),
      catchError(this._handleError<any>('updateHero'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteHero(id: number): Observable<Hero> {
    const url = `${this._heroesUrl}/${id}`;

    return this._http.delete<Hero>(url, this.httpOptions).pipe(
      tap((_) => {
        this._log(`deleted hero id=${id}`);
        this.getHeroes();
      }),
      catchError(this._handleError<Hero>('deleteHero'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private _handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this._log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private _log(message: string) {
    this._messageService.add(`HeroService: ${message}`);
  }
}
