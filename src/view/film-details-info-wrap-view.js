import { createElement } from '../render.js';

const createFilmDetailsInfoWrapTemplate = () =>
  `<div class="film-details__info-wrap">
  </div>`;

export default class FilmDetailsInfoWrapView {
  #element = null;

  get template() {
    return createFilmDetailsInfoWrapTemplate();
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
