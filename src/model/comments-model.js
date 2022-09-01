import { generateComment } from '../mock/comment.js';

export default class CommentsModel {
  #filmsModel = null;
  #allComments = [];
  #filmComments = [];

  constructor(filmsModel) {
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
}
