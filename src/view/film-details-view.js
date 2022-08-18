import { createElement } from '../render.js';

const filmDetailsTemplate = () =>
  `<section class="film-details">
    <div class="film-details__inner">
    </div>
  </section>`;

export default class FilmDetailsView {
  getTemplate() {
    return filmDetailsTemplate;
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
