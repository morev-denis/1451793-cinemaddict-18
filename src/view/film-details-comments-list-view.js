import { Selector } from '../constants.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import he from 'he';
import { formatISOStringToRelativeTime } from '../utils/film.js';

const createFilmDetailsCommentsListTemplate = (data) => {
  const { isDeleting, commentIdForDelete, filmComments } = data;

  const createFilmCommentsTemplate = () => {
    let filmCommentsTemplate = '';

    const createFilmDetailsCommentTemplate = (filmComment) => {
      const { author, comment, date, emotion } = filmComment;

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
              <button class="film-details__comment-delete" ${isDeleting ? 'disabled' : ''}>
                ${isDeleting && filmComment.id === commentIdForDelete ? 'Deleting...' : 'Delete'}
              </button>
            </p>
          </div>
        </li>`;
    };

    for (const comment of filmComments) {
      filmCommentsTemplate += createFilmDetailsCommentTemplate(comment);
    }

    return filmCommentsTemplate;
  };

  return `
    <ul class="film-details__comments-list">
      ${createFilmCommentsTemplate(filmComments, isDeleting, commentIdForDelete)}
    </ul>`;
};

export default class FilmDetailsCommentsListView extends AbstractStatefulView {
  constructor(film, filmComments) {
    super();
    this._state = FilmDetailsCommentsListView.parseFilmToState(film, filmComments);
  }

  get template() {
    return createFilmDetailsCommentsListTemplate(this._state);
  }

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    const deleteElements = this.element.querySelectorAll(Selector.FILM_DETAILS_COMMENT_DELETE);
    deleteElements.forEach((elem, index) =>
      elem.addEventListener('click', (evt) => this.#commentDeleteClickHandler(evt, index)),
    );
  };

  #commentDeleteClickHandler = (evt, index) => {
    evt.preventDefault();
    this._callback.deleteClick({
      film: FilmDetailsCommentsListView.parseStateToFilm(this._state),
      index,
    });
  };

  _restoreHandlers = () => {
    this.setDeleteClickHandler(this._callback.deleteClick);
  };

  static parseFilmToState = (film, filmComments) => ({
    ...film,
    filmComments: filmComments,
    isDeleting: false,
    commentIdForDelete: null,
  });

  static parseStateToFilm = (state) => {
    const film = { ...state };

    delete film.isDeleting;
    delete film.commentIdForDelete;

    return film;
  };
}
