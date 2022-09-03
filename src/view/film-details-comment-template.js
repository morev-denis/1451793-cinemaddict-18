import { formatISOStringToDateWithTime } from '../utils/film.js';

export const createFilmDetailsCommentTemplate = (commentObj) => {
  const { author, comment, date, emotion } = commentObj;

  return `
    <li class="film-details__comment">
      <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${formatISOStringToDateWithTime(date)}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`;
};
