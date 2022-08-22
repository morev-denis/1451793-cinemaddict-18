import { createElement } from '../render.js';

const createFilmsListTopRatedTemplate = () =>
  `<section class="films-list films-list--extra">
    <h2 class="films-list__title">Top rated</h2>
  </section>`;

export default class FilmsListTopRatedView {
  getTemplate() {
    return createFilmsListTopRatedTemplate();
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
