import { createElement } from '../render.js';

const createFilmDetailsBottomContainerTemplate = () =>
  `<div class="film-details__bottom-container">
    <section class="film-details__comments-wrap">
    </section>
  </div>`;

export default class FilmDetailsBottomContainerView {
  getTemplate() {
    return createFilmDetailsBottomContainerTemplate();
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
