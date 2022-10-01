import he from 'he';
import {
  convertMinutesToHours,
  formatISOStringToDate,
  formatISOStringToRelativeTime,
} from '../utils/film.js';
import { Classes } from '../constants.js';

const createFilmDetailsCommentTemplate = (commentObj, isDeleting) => {
  const { author, comment, date, emotion } = commentObj;

  return `
    <li class="film-details__comment">
      <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${he.encode(comment)}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${formatISOStringToRelativeTime(date)}</span>
          <button class="film-details__comment-delete" ${isDeleting ? 'disabled' : ''}>${isDeleting ? 'Deleting...' : 'Delete'}</button>
        </p>
      </div>
    </li>`;
};

const createFilmCommentsTemplate = (filmComments, isDeleting) => {
  let filmCommentsTemplate = '';

  for (let i = 0; i < filmComments.length; i++) {
    filmCommentsTemplate += createFilmDetailsCommentTemplate(filmComments[i], isDeleting);
  }

  return filmCommentsTemplate;
};

export const createFilmDetailsTemplate = (data) => {
  const {
    isDeleting,
    isDisabled,
    isSubmitting,
    selectedEmoji,
    filmComments,
    comments,
    filmInfo: {
      title,
      alternativeTitle,
      totalRating,
      poster,
      ageRating,
      director,
      writers,
      actors,
      release: { date, releaseCountry },
      runtime,
      genre,
      description,
    },
    userDetails: { watchlist, alreadyWatched, favorite },
  } = data;

  const popupWatchlistClassName = watchlist ? Classes.POPUP_CONTROL_BUTTON_ACTIVE_CLASS : '';
  const popupWatchedClassName = alreadyWatched ? Classes.POPUP_CONTROL_BUTTON_ACTIVE_CLASS : '';
  const popupFavoriteClassName = favorite ? Classes.POPUP_CONTROL_BUTTON_ACTIVE_CLASS : '';

  const createGenresListTemplate = (genresList) => {
    let genresListTemplate = '';

    for (let i = 0; i < genresList.length; i++) {
      genresListTemplate += `<span class="film-details__genre">${genresList[i]}</span>`;
    }

    return genresListTemplate;
  };

  const showSelectedEmoji = (emoji) =>
    emoji
      ? `<img src="images/emoji/${emoji}.png" width="70" height="70" alt="emoji-${emoji}"></img>`
      : '';

  const isCheckedEmoji = (currentEmoji, emoji) => (currentEmoji === emoji ? 'checked' : '');

  return `
  <section class="film-details">
    <div class="film-details__inner">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src=${poster} alt="Poster of the ${title}">

            <p class="film-details__age">${ageRating}+</p>
          </div>

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
                <td class="film-details__cell">${createGenresListTemplate(genre)}</tr>
            </table>

            <p class="film-details__film-description">${description}</p>
          </div>
        </div>

        <section class="film-details__controls">
          <button type="button" class="film-details__control-button film-details__control-button--watchlist ${popupWatchlistClassName}" id="watchlist" name="watchlist" ${isDisabled ? 'disabled' : '' }>Add to watchlist</button>
          <button type="button" class="film-details__control-button film-details__control-button--watched ${popupWatchedClassName}" id="watched" name="watched" ${isDisabled ? 'disabled' : '' }>Already watched</button>
          <button type="button" class="film-details__control-button film-details__control-button--favorite ${popupFavoriteClassName}" id="favorite" name="favorite" ${isDisabled ? 'disabled' : '' }>Add to favorites</button>
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${
  comments.length
}</span>
          </h3>

          <ul class="film-details__comments-list">
          ${createFilmCommentsTemplate(filmComments, isDeleting)}
          </ul>

          <form class="film-details__new-comment" action="" method="get">
            <div class="film-details__add-emoji-label">${showSelectedEmoji(selectedEmoji)}</div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder=${isSubmitting ? 'Submitting...' : 'Select reaction below and write comment here'} name="comment" ${isSubmitting ? 'disabled' : ''}></textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile"  ${isCheckedEmoji(
    selectedEmoji,
    'smile',
  )}>
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${isCheckedEmoji(
    selectedEmoji,
    'sleeping',
  )}>
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${isCheckedEmoji(
    selectedEmoji,
    'puke',
  )}>
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${isCheckedEmoji(
    selectedEmoji,
    'angry',
  )}>
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </form>
        </section>
      </div>
    </div>
  </section>`;
};
