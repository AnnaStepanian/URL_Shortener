import { createAction, createReducer, createSelector, on } from '@ngrx/store';

export const shortenUrlSuccess = createAction('[URL Shortener] Shorten URL Success', (urls: string[]) => ({ urls }));
export const shortenUrlFailure = createAction('[URL Shortener] Shorten URL Failure', (error: any) => ({ error }));

export interface State {
  urls: string[];
  error: any;
}

export const initialState: State = {
  urls: [],
  error: null
};

export const urlShortenerReducer = createReducer(
  initialState,
  on(shortenUrlSuccess, (state, { urls }) => ({ ...state, urls })),
  on(shortenUrlFailure, (state, { error }) => ({ ...state, error }))
);

export const selectUrls = (state: { urlShortener: State }) => state.urlShortener.urls;
export const selectError = (state: { urlShortener: State }) => state.urlShortener.error;
