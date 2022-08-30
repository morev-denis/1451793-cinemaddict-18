import { createElement } from '../render.js';

import { createFilmDetailsInfoWrapTemplate } from './film-details-info-wrap-template.js';
export default class FilmDetailsInfoWrapView {
  #element = null;
  #film = null;

  constructor(film) {
    this.#film = film;
  }

  get template() {
    return createFilmDetailsInfoWrapTemplate(this.#film);
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
