import { createElement } from '../render.js';

import { createFilmDetailsInfoTemplate } from './film-details-info-template.js';
export default class FilmDetailsInfoView {
  #element = null;
  #film = null;

  constructor(film) {
    this.#film = film;
  }

  get template() {
    return createFilmDetailsInfoTemplate(this.#film);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
