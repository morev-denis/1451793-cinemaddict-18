import { createElement } from '../render.js';

const createFilmsListTitleTemplate = (text) =>
  `<h2 class="films-list__title">${text}</h2>`;

export default class FilmsListContainerView {
  #element = null;
  #text = '';

  constructor(text) {
    this.#text = text;
  }

  get template() {
    return createFilmsListTitleTemplate(this.#text);
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
