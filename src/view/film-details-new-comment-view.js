import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { Selector } from '../constants.js';

const createFilmDetailsNewCommentTemplate = (data) => {
  const { isSubmitting, selectedEmoji } = data;

  const showSelectedEmoji = (emoji) =>
    emoji
      ? `<img src="images/emoji/${emoji}.png" width="70" height="70" alt="emoji-${emoji}"></img>`
      : '';

  const isCheckedEmoji = (currentEmoji, emoji) => (currentEmoji === emoji ? 'checked' : '');

  return `
    <form class="film-details__new-comment" action="" method="get">
      <div class="film-details__add-emoji-label">${showSelectedEmoji(selectedEmoji)}</div>

      <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder=${
  isSubmitting
    ? 'Submitting...'
    : 'Select&nbsp;reaction&nbsp;below&nbsp;and&nbsp;write&nbsp;comment&nbsp;here'
} name="comment" ${isSubmitting ? 'disabled' : ''}></textarea>
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
    </form>`;
};

export default class FilmDetailsNewCommentView extends AbstractStatefulView {
  constructor(film) {
    super();
    this._state = FilmDetailsNewCommentView.parseFilmToState(film);
    this.#setInnerHandlers();
  }

  get template() {
    return createFilmDetailsNewCommentTemplate(this._state);
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element
      .querySelector(Selector.FILM_DETAILS_COMMENT_INPUT)
      .addEventListener('keydown', this.#formSubmitHandler);
  };

  #formSubmitHandler = (evt) => {
    if (evt.ctrlKey === true && evt.key === 'Enter') {
      const comment = {
        comment: this._state.currentComment || ' ',
        emotion: this._state.selectedEmoji || 'smile',
      };
      this._callback.formSubmit({
        film: FilmDetailsNewCommentView.parseStateToFilm(this._state),
        comment: comment,
      });
    }
  };

  #emojiClickHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.matches('img')) {
      const inputId = evt.target.closest('label').getAttribute('for');
      const input = this.element.querySelector(`#${inputId}`);
      const inputValue = input.value;

      this.updateElement({ selectedEmoji: inputValue });
      this.element.querySelector(Selector.FILM_DETAILS_COMMENT_INPUT).value =
        this._state.currentComment;
      this.element.scrollTop = this._state.scrollTop;
    }
  };

  #inputHandler = (evt) => {
    evt.preventDefault();
    this._setState({ currentComment: evt.target.value });
  };

  #setInnerHandlers = () => {
    this.element
      .querySelector(Selector.FILM_DETAILS_EMOJI_LIST)
      .addEventListener('click', this.#emojiClickHandler);

    this.element
      .querySelector(Selector.FILM_DETAILS_COMMENT_INPUT)
      .addEventListener('input', this.#inputHandler);
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
  };

  static parseFilmToState = (film) => ({
    ...film,
    isSubmitting: false,
    selectedEmoji: 'smile',
    currentComment: null,
  });

  static parseStateToFilm = (state) => {
    const film = { ...state };

    delete film.isSubmitting;
    delete film.selectedEmoji;
    delete film.currentComment;

    return film;
  };
}
