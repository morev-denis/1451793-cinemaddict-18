import { render } from '../render.js';

import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmsListTopRatedView from '../view/films-list-top-rated-view.js';
import FilmsListMostCommentedView from '../view/films-list-most-commented-view.js';

export default class FilmsPresenter {
  filmsComponent = new FilmsView();
  filmsListComponent = new FilmsListView();
  filmsListContainerComponent = new FilmsListContainerView();
  filmsListTopRatedContainerComponent = new FilmsListContainerView();
  filmsListMostCommentedContainerComponent = new FilmsListContainerView();
  filmsListMostCommentedComponent = new FilmsListMostCommentedView();
  showMoreButtonComponent = new ShowMoreButtonView();
  filmsListTopRatedComponent = new FilmsListTopRatedView();

  init = (filmsContainer) => {
    this.filmsContainer = filmsContainer;

    render(this.filmsComponent, filmsContainer);

    render(this.filmsListComponent, this.filmsComponent.getElement());

    render(this.filmsListContainerComponent, this.filmsListComponent.getElement());

    for (let i = 0; i < 5; i++) {
      render(new FilmCardView(), this.filmsListContainerComponent.getElement());
    }

    render(this.showMoreButtonComponent, this.filmsListComponent.getElement());

    render(this.filmsListTopRatedComponent, this.filmsComponent.getElement());

    render(this.filmsListTopRatedContainerComponent, this.filmsListTopRatedComponent.getElement());

    for (let i = 0; i < 2; i++) {
      render(new FilmCardView(), this.filmsListTopRatedContainerComponent.getElement());
    }

    render(this.filmsListMostCommentedComponent, this.filmsComponent.getElement());

    render(
      this.filmsListMostCommentedContainerComponent,
      this.filmsListMostCommentedComponent.getElement(),
    );

    for (let i = 0; i < 2; i++) {
      render(new FilmCardView(), this.filmsListMostCommentedContainerComponent.getElement());
    }
  };
}
