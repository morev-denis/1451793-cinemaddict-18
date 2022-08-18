import { createElement } from '../render.js';

const filmDetailsPosterTemplate = () =>
  `<div class="film-details__poster">
    <img class="film-details__poster-img" src="./images/posters/the-great-flamarion.jpg" alt="">
    <p class="film-details__age">18+</p>
  </div>`;

export default class FilmDetailsPosterView {
  getTemplate() {
    return filmDetailsPosterTemplate;
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
