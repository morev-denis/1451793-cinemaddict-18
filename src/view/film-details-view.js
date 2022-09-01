import { Selectors } from '../constants.js';

import AbstractView from '../framework/view/abstract-view.js';

import { createFilmDetailsTemplate } from './film-details-template.js';

export default class FilmDetailsView extends AbstractView {
  #film = null;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createFilmDetailsTemplate(this.#film);
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
}
