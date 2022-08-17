import { createElement } from '../render.js';

const filmsTemplate = () =>
  `<section class="films">
  </section>`;

export default class FilmsView {
  getTemplate() {
    return filmsTemplate;
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
