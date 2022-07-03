import { createReducer, on } from '@ngrx/store';

import { addHero, updateHero } from './hero.actions';

export const initialState = [];

export const heroReducer = createReducer(
  initialState,
  on(addHero, (state) => state),
  on(updateHero, (state) => state)
);
