import { createElement } from '../render.js';

import { createFilmDetailsFormTemplate } from './film-details-form-template.js';

export default class FilmDetailsFormView {
  #element = null;

  get template() {
    return createFilmDetailsFormTemplate();
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
