import { Selectors } from '../constants.js';

import AbstractView from '../framework/view/abstract-view.js';

import { createFilmCardTemplate } from './film-card-template.js';

export default class FilmCardView extends AbstractView {
  #film = null;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createFilmCardTemplate(this.#film);
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element
      .querySelector(Selectors.FILM_CARD_LINK_SELECTOR)
      .addEventListener('click', this.#clickHandler);
  };

  #clickHandler = () => {
    this._callback.click();
  };
}
