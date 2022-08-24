import { createElement } from '../render.js';

import { createFilmDetailsCommentTemplate } from './film-details-comment-template.js';
export default class FilmDetailsCommentView {
  constructor(comment) {
    this.comment = comment;
  }

  getTemplate() {
    return createFilmDetailsCommentTemplate(this.comment);
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
