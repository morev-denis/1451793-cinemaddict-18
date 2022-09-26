import { generateComment } from '../mock/comment.js';

import Observable from '../framework/observable.js';

export default class CommentsModel extends Observable {
  #filmsModel = null;
  #allComments = [];
  #filmComments = [];

  constructor(filmsModel) {
    super();
    this.#filmsModel = filmsModel;
    this.#generateAllComments();
  }

  #getCommentsCount = (films) => films.reduce((count, film) => count + film.comments.length, 0);

  #generateComments = (films) => {
    const commentsCount = this.#getCommentsCount(films);

    return Array.from({ length: commentsCount }, (_value, index) => {
      const commentItem = generateComment();

      return {
        id: String(index + 1),
        ...commentItem,
      };
    });
  };

  #generateAllComments = () => {
    this.#allComments = this.#generateComments(this.#filmsModel.films);
  };

  getComments = (film) => {
    this.#filmComments = film.comments.map((commentId) =>
      this.#allComments.find((comment) => comment.id === commentId),
    );

    return this.#filmComments;
  };

  addComment = (updateType, payload) => {
    this.#filmComments = [...this.#filmComments, payload];

    this.#allComments.push(payload);

    this._notify(updateType, this.#filmComments);
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
