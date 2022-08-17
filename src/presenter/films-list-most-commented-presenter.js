import { render } from '../render.js';

import FilmsListMostCommentedView from '../view/films-list-most-commented-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';

import FilmsListContainerPresenter from './films-list-container-presenter.js';

const filmsListContainerPresenter = new FilmsListContainerPresenter();

export default class FilmsListMostCommentedPresenter {
  filmsListMostCommentedComponent = new FilmsListMostCommentedView();
  filmsListContainerComponent = new FilmsListContainerView();
  showMoreButtonComponent = new ShowMoreButtonView();

  init = (filmsListContainer) => {
    this.filmsListContainer = filmsListContainer;
    render(this.filmsListMostCommentedComponent, filmsListContainer);

    filmsListContainerPresenter.init(this.filmsListMostCommentedComponent.getElement(), 2);
  };
}
