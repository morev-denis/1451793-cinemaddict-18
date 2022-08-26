import { createElement } from '../render.js';

import { createFilmDetailsInfoTemplate } from './film-details-info-template.js';
export default class FilmDetailsInfoView {
  constructor(film) {
    this.film = film;
  }

  getTemplate() {
    return createFilmDetailsInfoTemplate(this.film);
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
