import { createElement } from '../render.js';

const filmDetailsInfoWrapTemplate = () =>
  `<div class="film-details__info-wrap">
  </div>`;

export default class FilmDetailsInfoWrapView {
  getTemplate() {
    return filmDetailsInfoWrapTemplate;
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
