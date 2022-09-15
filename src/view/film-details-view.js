import { Selectors } from '../constants.js';

import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

import { createFilmDetailsTemplate } from './film-details-template.js';

export default class FilmDetailsView extends AbstractStatefulView {
  constructor(film, commentsModel) {
    super();
    this._state = FilmDetailsView.parseFilmToState(film, commentsModel);
    this.#setInnerHandlers();
  }

  get template() {
    return createFilmDetailsTemplate(this._state);
  }

  setCloseButtonClickHandler = (callback) => {
    this._callback.closeButtonClick = callback;
    this.element
      .querySelector(Selectors.FILM_DETAILS_CLOSE_BTN)
      .addEventListener('click', this.#clickCloseButtonHandler);
  };

  #clickCloseButtonHandler = () => {
    this._callback.closeButtonClick();
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

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setCloseButtonClickHandler(this._callback.closeButtonClick);
    this.setWatchlistClickHandler(this._callback.watchlistClick);
    this.setAlreadyWatchedClickHandler(this._callback.alreadyWatchedClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };

  #emojiClickHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.matches('img')) {
      const inputId = evt.target.closest('label').getAttribute('for');
      const input = this.element.querySelector(`#${inputId}`);
      const inputValue = input.value;

      this.updateElement({ selectedEmoji: inputValue });
      this.element.querySelector(Selectors.FILM_DETAILS_COMMENT_INPUT).value =
        this._state.currentComment;
      this.element.scrollTop = this._state.scrollTop;
    }
  };

  #scrollHandler = (evt) => {
    evt.preventDefault();
    this._setState({ scrollTop: evt.target.scrollTop });
  };

  #inputHandler = (evt) => {
    evt.preventDefault();
    this._setState({ currentComment: evt.target.value });
  };

  #setInnerHandlers = () => {
    this.element
      .querySelector(Selectors.FILM_DETAILS_EMOJI_LIST)
      .addEventListener('click', this.#emojiClickHandler);
    this.element.addEventListener('scroll', this.#scrollHandler);
    this.element
      .querySelector('.film-details__comment-input')
      .addEventListener('input', this.#inputHandler);
  };

  static parseFilmToState = (film, commentsModel) => {
    const filmComments = [...commentsModel.getComments(film)];
    return {
      ...film,
      filmComments: filmComments,
      selectedEmoji: null,
      scrollTop: 0,
      currentComment: null,
    };
  };

  static parseStateToFilm = (state) => {
    const film = { ...state };

    delete film.filmComments;
    delete film.selectedEmoji;
    delete film.scrollTop;
    delete film.currentComment;

    return film;
  };
}
