import Observable from '../framework/observable.js';

export default class CommentsModel extends Observable {
  #allComments = [];
  #filmComments = [];
  #commentsApiService = null;

  constructor(commentsApiService) {
    super();
    this.#commentsApiService = commentsApiService;
  }

  init = async (filmId) => {
    try {
      this.#filmComments = await this.#commentsApiService.getComments(filmId);
    } catch (err) {
      this.#filmComments = [];
    }
  };

  comments = () => this.#filmComments;

  addComment = (updateType, update) => {
    const comments = [...update.film.comments, update.сomment.id];

    this.#allComments = [...this.#allComments, update.сomment];

    this._notify(updateType, { ...update.film, comments });
  };

  deleteComment = (updateType, update) => {
    this.#filmComments = [
      ...this.#filmComments.slice(0, update.index),
      ...this.#filmComments.slice(update.index + 1),
    ];

    const commentId = update.film.comments[update.index];
    this.#allComments = this.#allComments.filter((comment) => comment.id !== commentId);

    const comments = [
      ...update.film.comments.slice(0, update.index),
      ...update.film.comments.slice(update.index + 1),
    ];

    this._notify(updateType, { ...update.film, filmComments: this.#filmComments, comments });
  };
}
