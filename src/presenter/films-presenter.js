import { MOST_COMMENTED_FILMS_COUNT, TOP_RATED_FILMS_COUNT } from '../constants.js';

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

  init = (filmsContainer, filmsModel) => {
    this.filmsContainer = filmsContainer;
    this.filmsModel = filmsModel;
    this.films = [...this.filmsModel.getFilms()];

    render(this.filmsComponent, filmsContainer);

    render(this.filmsListComponent, this.filmsComponent.getElement());

    render(this.filmsListContainerComponent, this.filmsListComponent.getElement());

    for (let i = 0; i < this.films.length; i++) {
      render(new FilmCardView(this.films[i]), this.filmsListContainerComponent.getElement());
    }

    render(this.showMoreButtonComponent, this.filmsListComponent.getElement());

    render(this.filmsListTopRatedComponent, this.filmsComponent.getElement());

    render(this.filmsListTopRatedContainerComponent, this.filmsListTopRatedComponent.getElement());

    for (let i = 0; i < TOP_RATED_FILMS_COUNT; i++) {
      render(
        new FilmCardView(this.films[i]),
        this.filmsListTopRatedContainerComponent.getElement(),
      );
    }

    render(this.filmsListMostCommentedComponent, this.filmsComponent.getElement());

    render(
      this.filmsListMostCommentedContainerComponent,
      this.filmsListMostCommentedComponent.getElement(),
    );

    for (let i = 0; i < MOST_COMMENTED_FILMS_COUNT; i++) {
      render(
        new FilmCardView(this.films[i]),
        this.filmsListMostCommentedContainerComponent.getElement(),
      );
    }
  };
}
