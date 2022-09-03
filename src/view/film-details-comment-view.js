import AbstractView from '../framework/view/abstract-view.js';

import { createFilmDetailsCommentTemplate } from './film-details-comment-template.js';

export default class FilmDetailsCommentView extends AbstractView {
  #comment = null;

  constructor(comment) {
    super();
    this.#comment = comment;
  }

  get template() {
    return createFilmDetailsCommentTemplate(this.#comment);
  }
}
