import { convertMinutesToHours, formatISOStringToDate } from '../utils.js';

export const createFilmDetailsInfoTemplate = (film) => {
  const {
    filmInfo: {
      title,
      alternativeTitle,
      totalRating,
      director,
      writers,
      actors,
      release: { date, releaseCountry },
      runtime,
      genre,
      description,
    },
  } = film;

  const createGenresListTemplate = (genresList) => {
    let genresListTemplate = '';

    for (let i = 0; i < genresList.length; i++) {
      genresListTemplate += `<span class="film-details__genre">${genresList[i]}</span>`;
    }

    return genresListTemplate;
  };

  return `
    <div class="film-details__info">
      <div class="film-details__info-head">
        <div class="film-details__title-wrap">
          <h3 class="film-details__title">${title}</h3>
          <p class="film-details__title-original">Original: ${alternativeTitle}</p>
        </div>

        <div class="film-details__rating">
          <p class="film-details__total-rating">${totalRating}</p>
        </div>
      </div>

      <table class="film-details__table">
        <tr class="film-details__row">
          <td class="film-details__term">Director</td>
          <td class="film-details__cell">${director}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">Writers</td>
          <td class="film-details__cell">${writers.join(', ')}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">Actors</td>
          <td class="film-details__cell">${actors.join(', ')}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">Release Date</td>
          <td class="film-details__cell">${formatISOStringToDate(date)}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">Runtime</td>
          <td class="film-details__cell">${convertMinutesToHours(runtime)}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">Country</td>
          <td class="film-details__cell">${releaseCountry}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">${genre.length > 1 ? 'Genres' : 'Genre'}</td>
          <td class="film-details__cell">
            ${createGenresListTemplate(genre)}
          </td>
        </tr>
      </table>

      <p class="film-details__film-description">
        ${description}
      </p>
    </div>`;
};
