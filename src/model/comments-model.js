import Observable from '../framework/observable.js';
import { adaptToClient } from '../adapter/adapt-to-client.js';

export default class CommentsModel extends Observable {
  #filmComments = [];
  #commentsApiService = null;
  #adaptToClient = null;

  constructor(commentsApiService) {
    super();
    this.#commentsApiService = commentsApiService;
    this.#adaptToClient = adaptToClient;
  }

  init = async (filmId) => {
    try {
      this.#filmComments = await this.#commentsApiService.getComments(filmId);
    } catch (err) {
      this.#filmComments = [];
    }
  };

  get comments() {
    return this.#filmComments;
  }

  deleteComment = async (updateType, update) => {
    const deletedCommentId = update.film.comments[update.index];

    try {
      await this.#commentsApiService.deleteComment(deletedCommentId);

      const comments = [
        ...update.film.comments.slice(0, update.index),
        ...update.film.comments.slice(update.index + 1),
      ];

      const filmComments = update.film.filmComments.filter((filmComment) => filmComment.id !== deletedCommentId);

      this._notify(updateType, { ...update.film, comments, filmComments });
    } catch (err) {
      throw new Error('Can\'t delete comment');
    }
  };

  addComment = async (updateType, update) => {
    try {
      const response = await this.#commentsApiService.addComment(update.comment, update.film.id);
      const updatedFilm = this.#adaptToClient(response.movie);
      this._notify(updateType, updatedFilm);
    } catch (err) {
      throw new Error('Can\'t add comment');
    }
  };
}
