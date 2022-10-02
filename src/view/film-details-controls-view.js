import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { Classes, Selectors } from '../constants.js';

const createFilmDetailsControlsTemplate = (data) => {
  const {
    isDisabled,
    userDetails: { watchlist, alreadyWatched, favorite },
  } = data;

  const popupWatchlistClassName = watchlist ? Classes.POPUP_CONTROL_BUTTON_ACTIVE_CLASS : '';
  const popupWatchedClassName = alreadyWatched ? Classes.POPUP_CONTROL_BUTTON_ACTIVE_CLASS : '';
  const popupFavoriteClassName = favorite ? Classes.POPUP_CONTROL_BUTTON_ACTIVE_CLASS : '';

  return `
    <section class="film-details__controls">
      <button type="button" class="film-details__control-button film-details__control-button--watchlist ${popupWatchlistClassName}" id="watchlist" name="watchlist" ${
  isDisabled ? 'disabled' : ''
}>Add to watchlist</button>
      <button type="button" class="film-details__control-button film-details__control-button--watched ${popupWatchedClassName}" id="watched" name="watched" ${
  isDisabled ? 'disabled' : ''
}>Already watched</button>
      <button type="button" class="film-details__control-button film-details__control-button--favorite ${popupFavoriteClassName}" id="favorite" name="favorite" ${
  isDisabled ? 'disabled' : ''
}>Add to favorites</button>
    </section>`;
};

export default class FilmDetailsControlsView extends AbstractStatefulView {
  constructor(film) {
    super();
    this._state = FilmDetailsControlsView.parseFilmToState(film);
  }

  get template() {
    return createFilmDetailsControlsTemplate(this._state);
  }

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

  _restoreHandlers = () => {
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
