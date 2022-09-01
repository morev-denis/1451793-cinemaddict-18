import { FILMS_COUNT, MAX_COMMENTS_ON_FILM } from '../constants.js';
import { getRandomInteger } from '../utils.js';

import { generateFilm } from '../mock/film.js';

export default class FilmsModel {
  #generateFilms = () => {
    const films = Array.from({ length: FILMS_COUNT }, generateFilm);

    let totalCommentsCount = 0;

    return films.map((film, index) => {
      const hasComments = getRandomInteger(0, 1);

      const filmCommentsCount = hasComments ? getRandomInteger(1, MAX_COMMENTS_ON_FILM) : 0;

      totalCommentsCount += filmCommentsCount;

      return {
        id: String(index + 1),
        comments: hasComments
          ? Array.from({ length: filmCommentsCount }, (_value, commentIndex) =>
            String(totalCommentsCount - commentIndex),
          )
          : [],
        filmInfo: film,
      };
    });
  };

  #films = this.#generateFilms();

  get films() {
    return this.#films;
  }
}
