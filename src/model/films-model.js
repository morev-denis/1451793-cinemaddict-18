import { FILMS_COUNT } from '../constants.js';

import { generateFilm } from '../mock/film.js';

export default class FilmsModel {
  films = Array.from({ length: FILMS_COUNT }, generateFilm);

  getFilms = () => this.films;
}
