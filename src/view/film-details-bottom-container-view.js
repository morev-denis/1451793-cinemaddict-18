import { createElement } from '../render.js';

const createFilmDetailsBottomContainerTemplate = () =>
  `<div class="film-details__bottom-container">
    <section class="film-details__comments-wrap">
    </section>
  </div>`;

export default class FilmDetailsBottomContainerView {
  #element = null;

  get template() {
    return createFilmDetailsBottomContainerTemplate();
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
