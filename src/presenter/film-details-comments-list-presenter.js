import { render, RenderPosition } from '../render.js';

import FilmDetailsCommentsListView from '../view/film-details-comments-list-view.js';
import FilmDetailsCommentView from '../view/film-details-comment-view.js';

export default class FilmDetailsCommentsListPresenter {
  filmDetailsCommentsListComponent = new FilmDetailsCommentsListView();

  init = (filmDetailsCommentsListContainer, commentsCount = 4) => {
    this.filmDetailsCommentsListContainer = filmDetailsCommentsListContainer;

    render(this.filmDetailsCommentsListComponent, this.filmDetailsCommentsListContainer);

    for (let i = 0; i < commentsCount; i++) {
      render(new FilmDetailsCommentView(), this.filmDetailsCommentsListComponent.getElement());
    }
  };
}
