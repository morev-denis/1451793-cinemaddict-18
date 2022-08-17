import { render } from '../render.js';

import FilmsListTopRatedView from '../view/films-list-top-rated-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';

import FilmsListContainerPresenter from './films-list-container-presenter.js';

const filmsListContainerPresenter = new FilmsListContainerPresenter();

export default class FilmsListTopRatedPresenter {
  filmsListTopRatedComponent = new FilmsListTopRatedView();
  filmsListContainerComponent = new FilmsListContainerView();
  showMoreButtonComponent = new ShowMoreButtonView();

  init = (filmsListContainer) => {
    this.filmsListContainer = filmsListContainer;
    render(this.filmsListTopRatedComponent, filmsListContainer);

    filmsListContainerPresenter.init(this.filmsListTopRatedComponent.getElement(), 2);
  };
}
