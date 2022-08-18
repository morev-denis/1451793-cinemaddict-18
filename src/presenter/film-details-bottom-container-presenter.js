import { render } from '../render.js';

import FilmDetailsBottomContainerView from '../view/film-details-bottom-container-view.js';
import FilmDetailsFormView from '../view/film-details-form-view.js';

import FilmDetailsCommentsListPresenter from './film-details-comments-list-presenter.js';

const filmDetailsCommentsListPresenter = new FilmDetailsCommentsListPresenter();

export default class FilmDetailsBottomContainerPresenter {
  filmDetailsBottomContainerComponent = new FilmDetailsBottomContainerView();
  filmDetailsFormComponent = new FilmDetailsFormView();

  init = (filmDetailsBottomContainer) => {
    this.filmDetailsBottomContainer = filmDetailsBottomContainer;
    render(this.filmDetailsBottomContainerComponent, this.filmDetailsBottomContainer);

    filmDetailsCommentsListPresenter.init(
      this.filmDetailsBottomContainerComponent.getElement().firstElementChild,
      4,
    );

    render(
      this.filmDetailsFormComponent,
      this.filmDetailsBottomContainerComponent.getElement().firstElementChild,
    );
  };
}
