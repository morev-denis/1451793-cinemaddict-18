import { formatISOStringToYear, formatMinutesToTime } from '../utils.js';
import { CommentLength } from '../constants.js';

export const createFilmCardTemplate = (film) => {
  const {
    comments,
    filmInfo: {
      title,
      totalRating,
      poster,
      release: { date },
      runtime,
      genre,
      description,
    },
  } = film;

  return `
    <article class="film-card">
      <a class="film-card__link">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${totalRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${formatISOStringToYear(date)}</span>
          <span class="film-card__duration">${formatMinutesToTime(runtime)}</span>
          <span class="film-card__genre">${genre[0]}</span>
        </p>
        <img src=${poster} alt="Poster of the ${title}" class="film-card__poster">
        <p class="film-card__description">${
  description.length > CommentLength.MAX
    ? `${description.slice(CommentLength.MIN, CommentLength.MAX - 1)}…`
    : description
}</p>
        <span class="film-card__comments">${comments.length} comments</span>
      </a>
      <div class="film-card__controls">
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">
          Add to watchlist
        </button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">
          Mark as watched
        </button>
        <button class="film-card__controls-item film-card__controls-item--favorite" type="button">
          Mark as favorite
        </button>
      </div>
    </article>`;
};
