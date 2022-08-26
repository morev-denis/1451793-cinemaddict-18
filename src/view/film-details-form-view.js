import { createElement } from '../render.js';

import { createFilmDetailsFormTemplate } from './film-details-form-template.js';
export default class FilmDetailsFormView {
  getTemplate() {
    return createFilmDetailsFormTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
