import { render } from '../render.js';

import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';

import FilmsListContainerPresenter from './films-list-container-presenter.js';

const filmsListContainerPresenter = new FilmsListContainerPresenter();

export default class FilmsListPresenter {
  filmsListComponent = new FilmsListView();
  filmsListContainerComponent = new FilmsListContainerView();
  showMoreButtonComponent = new ShowMoreButtonView();

  init = (filmsListContainer) => {
    this.filmsListContainer = filmsListContainer;

    render(this.filmsListComponent, filmsListContainer);

    filmsListContainerPresenter.init(this.filmsListComponent.getElement(), 5);

    render(this.showMoreButtonComponent, this.filmsListComponent.getElement());
  };
}
