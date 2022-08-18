import { createElement } from '../render.js';

const filmDetailsCommentsListTemplate = () =>
  `<ul class="film-details__comments-list">
  </ul>`;

export default class FilmDetailsCommentsListView {
  getTemplate() {
    return filmDetailsCommentsListTemplate;
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
