import { createElement } from '../render.js';

const createFilmDetailsCloseTemplate = () =>
  `<div class="film-details__close">
    <button class="film-details__close-btn" type="button">close</button>
  </div>`;

export default class FilmDetailsCloseView {
  getTemplate() {
    return createFilmDetailsCloseTemplate();
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
