import { createElement } from '../render.js';

const createFilmDetailsCloseTemplate = () =>
  `<div class="film-details__close">
    <button class="film-details__close-btn" type="button">close</button>
  </div>`;

export default class FilmDetailsCloseView {
  #element = null;

  get template() {
    return createFilmDetailsCloseTemplate();
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
