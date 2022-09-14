import { Selectors } from '../constants.js';

import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

import { createFilmDetailsTemplate } from './film-details-template.js';

export default class FilmDetailsView extends AbstractStatefulView {
  constructor(film, commentsModel) {
    super();
    this._state = FilmDetailsView.parseFilmToState(film, commentsModel);
  }

  get template() {
    return createFilmDetailsTemplate(this._state);
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element
      .querySelector(Selectors.FILM_DETAILS_CLOSE_BTN)
      .addEventListener('click', this.#clickHandler);
  };

  #clickHandler = () => {
    this._callback.click();
  };

  setWatchlistClickHandler = (callback) => {
    this._callback.watchlistClick = callback;
    this.element
      .querySelector(Selectors.POPUP_ADD_TO_WATCHLIST_BTN)
      .addEventListener('click', this.#watchlistClickHandler);
  };

  #watchlistClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchlistClick();
  };

  setAlreadyWatchedClickHandler = (callback) => {
    this._callback.alreadyWatchedClick = callback;
    this.element
      .querySelector(Selectors.POPUP_MARK_AS_WATCHED_BTN)
      .addEventListener('click', this.#alreadyWatchedClickHandler);
  };

  #alreadyWatchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.alreadyWatchedClick();
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element
      .querySelector(Selectors.POPUP_ADD_TO_FAVORITE_BTN)
      .addEventListener('click', this.#favoriteClickHandler);
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };

  static parseFilmToState = (film, commentsModel) => {
    const filmComments = [...commentsModel.getComments(film)];
    return { ...film, filmComments: filmComments };
  };

  static parseStateToFilm = (state) => {
    const film = { ...state };

    delete film.filmComments;

    return film;
  };
}
