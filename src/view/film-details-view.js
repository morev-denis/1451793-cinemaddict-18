import { Selectors } from '../constants.js';

import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

import { createFilmDetailsTemplate } from './film-details-template.js';

export default class FilmDetailsView extends AbstractStatefulView {
  constructor(film, filmComments) {
    super();
    this._state = FilmDetailsView.parseFilmToState(film, filmComments);
    this.#setInnerHandlers();
  }

  get template() {
    return createFilmDetailsTemplate(this._state);
  }

  #restoreScrollPosition = () => {
    document.querySelector('.film-details').scrollTop = this._state.scrollTop;
  };

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

    this.#restoreScrollPosition();
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

    this.#restoreScrollPosition();
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

    this.#restoreScrollPosition();
  };

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    const deleteElements = this.element.querySelectorAll(Selectors.FILM_DETAILS_COMMENT_DELETE);
    deleteElements.forEach((elem, index) =>
      elem.addEventListener('click', (evt) => this.#commentDeleteClickHandler(evt, index)),
    );
  };

  #commentDeleteClickHandler = (evt, index) => {
    evt.preventDefault();
    this._callback.deleteClick({ film: FilmDetailsView.parseStateToFilm(this._state), index });

    this.#restoreScrollPosition();
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element
      .querySelector(Selectors.FILM_DETAILS_COMMENT_INPUT)
      .addEventListener('keydown', this.#formSubmitHandler);
  };

  #formSubmitHandler = (evt) => {
    if (evt.ctrlKey === true && evt.key === 'Enter') {
      const comment = {
        comment: this._state.currentComment || ' ',
        emotion: this._state.selectedEmoji || 'smile',
      };
      this._callback.formSubmit({
        film: FilmDetailsView.parseStateToFilm(this._state),
        comment: comment,
      });

      this.#restoreScrollPosition();
    }
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
      .querySelector(Selectors.FILM_DETAILS_COMMENT_INPUT)
      .addEventListener('input', this.#inputHandler);
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setCloseButtonClickHandler(this._callback.closeButtonClick);
    this.setWatchlistClickHandler(this._callback.watchlistClick);
    this.setAlreadyWatchedClickHandler(this._callback.alreadyWatchedClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setDeleteClickHandler(this._callback.deleteClick);
    this.setFormSubmitHandler(this._callback.formSubmit);
  };

  static parseFilmToState = (film, filmComments) => ({
    ...film,
    filmComments: filmComments,
    selectedEmoji: 'smile',
    scrollTop: 0,
    currentComment: null,
    isDeleting: false,
    isDisabled: false,
    isSubmitting: false,
    commentIdForDelete: null,
  });

  static parseStateToFilm = (state) => {
    const film = { ...state };

    delete film.filmComments;
    delete film.selectedEmoji;
    delete film.scrollTop;
    delete film.currentComment;
    delete film.isDeleting;
    delete film.isDisabled;
    delete film.isSubmitting;
    delete film.commentIdForDelete;

    return film;
  };
}
