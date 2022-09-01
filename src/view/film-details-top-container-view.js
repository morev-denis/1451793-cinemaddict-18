import AbstractView from '../framework/view/abstract-view.js';

const createFilmDetailsTopContainerTemplate = () =>
  `<div class="film-details__top-container">
  </div>`;

export default class FilmDetailsTopContainerView extends AbstractView {
  get template() {
    return createFilmDetailsTopContainerTemplate();
  }
}
