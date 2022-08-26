import { generateComment } from '../mock/comment.js';

const getCommentsCount = (films) => films.reduce((count, film) => count + film.comments.length, 0);

const generateComments = (films) => {
  const commentsCount = getCommentsCount(films);

  return Array.from({ length: commentsCount }, (_value, index) => {
    const commentItem = generateComment();

    return {
      id: String(index + 1),
      ...commentItem,
    };
  });
};

export default class CommentsModel {
  filmsModel = null;
  allComments = [];
  filmComments = [];

  constructor(filmsModel) {
    this.filmsModel = filmsModel;
    this.generateAllComments();
  }

  generateAllComments() {
    this.allComments = generateComments(this.filmsModel.getFilms());
  }

  getComments = (film) => {
    this.filmComments = film.comments.map((commentId) =>
      this.allComments.find((comment) => comment.id === commentId),
    );

    return this.filmComments;
  };
}
