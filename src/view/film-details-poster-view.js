import { createElement } from '../render.js';

const createFilmDetailsPosterTemplate = (film) => {
  const {
    filmInfo: { title, poster, ageRating },
  } = film;

  return `
    <div class="film-details__poster">
      <img class="film-details__poster-img" src=${poster} alt="Poster of the ${title}">
      <p class="film-details__age">${ageRating}+</p>
    </div>`;
};

export default class FilmDetailsPosterView {
  constructor(film) {
    this.film = film;
  }

  getTemplate() {
    return createFilmDetailsPosterTemplate(this.film);
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
