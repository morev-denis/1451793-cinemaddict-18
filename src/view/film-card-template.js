import { formatISOStringToYear, formatMinutesToTime } from '../utils/film.js';
import { DescriptionLength, Classes } from '../constants.js';

export const createFilmCardTemplate = (data) => {
  const {
    isDisabled,
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
    userDetails: { watchlist, alreadyWatched, favorite },
  } = data;

  const watchlistClassName = watchlist ? Classes.CONTROL_BUTTON_ACTIVE_CLASS : '';
  const watchedClassName = alreadyWatched ? Classes.CONTROL_BUTTON_ACTIVE_CLASS : '';
  const favoriteClassName = favorite ? Classes.CONTROL_BUTTON_ACTIVE_CLASS : '';

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
  description.length > DescriptionLength.MAX
    ? `${description.slice(DescriptionLength.MIN, DescriptionLength.MAX - 1)}…`
    : description
}</p>
        <span class="film-card__comments">${comments.length} comments</span>
      </a>
      <div class="film-card__controls">
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchlistClassName}" type="button" ${isDisabled ? 'disabled' : ''}>
          Add to watchlist
        </button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${watchedClassName}" type="button" ${isDisabled ? 'disabled' : ''}>
          Mark as watched
        </button>
        <button class="film-card__controls-item film-card__controls-item--favorite ${favoriteClassName}" type="button" ${isDisabled ? 'disabled' : ''}>
          Mark as favorite
        </button>
      </div>
    </article>`;
};
