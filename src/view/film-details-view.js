import { Selectors } from '../constants.js';

import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

import { createFilmDetailsTemplate } from './film-details-template.js';

export default class FilmDetailsView extends AbstractStatefulView {
  constructor(film) {
    super();
    this._state = FilmDetailsView.parseFilmToState(film);
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


  #scrollHandler = (evt) => {
    evt.preventDefault();
    this._setState({ scrollTop: evt.target.scrollTop });
  };

  #setInnerHandlers = () => {
    this.element.addEventListener('scroll', this.#scrollHandler);
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setCloseButtonClickHandler(this._callback.closeButtonClick);
    this.setDeleteClickHandler(this._callback.deleteClick);
  };

  static parseFilmToState = (film) => ({
    ...film,
    scrollTop: 0,
  });

  static parseStateToFilm = (state) => {
    const film = { ...state };

    delete film.scrollTop;

    return film;
  };
}
