import AbstractView from '../framework/view/abstract-view.js';

import { createFilmDetailsTemplate } from './film-details-template.js';

export default class FilmDetailsView extends AbstractView {
  #film = null;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createFilmDetailsTemplate(this.#film);
  }
}
