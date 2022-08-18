import { createElement } from '../render.js';

const filmDetailsTopContainerTemplate = () =>
  `<div class="film-details__top-container">
  </div>`;

export default class FilmDetailsTopContainerView {
  getTemplate() {
    return filmDetailsTopContainerTemplate;
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
