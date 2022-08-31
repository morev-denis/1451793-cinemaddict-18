import { createElement } from '../render.js';

const createFilmsListContainerTemplate = () =>
  `<section class="films-list">
  </section>`;

export default class FilmsListContainerView {
  #element = null;

  get template() {
    return createFilmsListContainerTemplate();
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
