import { Selector } from '../constants.js';

import AbstractStatefulView from '../framework/view/abstract-stateful-view';

import { createFilmCardTemplate } from './film-card-template.js';

export default class FilmCardView extends AbstractStatefulView {
  constructor(film) {
    super();
    this._state = FilmCardView.parseFilmToState(film);
  }

  get template() {
    return createFilmCardTemplate(this._state);
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element
      .querySelector(Selector.FILM_CARD_LINK_SELECTOR)
      .addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  setWatchlistClickHandler = (callback) => {
    this._callback.watchlistClick = callback;
    this.element
      .querySelector(Selector.ADD_TO_WATCHLIST_BTN)
      .addEventListener('click', this.#watchlistClickHandler);
  };

  #watchlistClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchlistClick();
  };

  setAlreadyWatchedClickHandler = (callback) => {
    this._callback.alreadyWatchedClick = callback;
    this.element
      .querySelector(Selector.MARK_AS_WATCHED_BTN)
      .addEventListener('click', this.#alreadyWatchedClickHandler);
  };

  #alreadyWatchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.alreadyWatchedClick();
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element
      .querySelector(Selector.ADD_TO_FAVORITE_BTN)
      .addEventListener('click', this.#favoriteClickHandler);
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };

  _restoreHandlers = () => {
    this.setClickHandler(this._callback.click);
    this.setWatchlistClickHandler(this._callback.watchlistClick);
    this.setAlreadyWatchedClickHandler(this._callback.alreadyWatchedClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
  };

  static parseFilmToState = (film) => ({
    ...film,
    isDisabled: false,
  });

  static parseStateToFilm = (state) => {
    const film = { ...state };

    delete film.isDisabled;

    return film;
  };
}
