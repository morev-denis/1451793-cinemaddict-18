import AbstractView from '../framework/view/abstract-view.js';

import { createFilmCardTemplate } from './film-card-template.js';

export default class FilmCardView extends AbstractView {
  #film = null;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createFilmCardTemplate(this.#film);
  }
}
