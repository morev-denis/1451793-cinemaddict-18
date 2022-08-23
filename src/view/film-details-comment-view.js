import { createElement } from '../render.js';
import dayjs from 'dayjs';

const createFilmDetailsCommentTemplate = (commentObj) => {
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
          <span class="film-details__comment-day">${dayjs(date).format('YYYY/MM/DD HH:MM')}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`;
};

export default class FilmDetailsCommentView {
  constructor(comment) {
    this.comment = comment;
  }

  getTemplate() {
    return createFilmDetailsCommentTemplate(this.comment);
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
