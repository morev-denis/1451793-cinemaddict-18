import { createElement } from '../render.js';

const createFilmDetailsCommentsTitleTemplate = (comments) =>
  `<h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>`;

export default class FilmDetailsCommentsTitleView {
  constructor(comments) {
    this.comments = comments;
  }

  getTemplate() {
    return createFilmDetailsCommentsTitleTemplate(this.comments);
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
