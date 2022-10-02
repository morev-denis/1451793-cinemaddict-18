import { Classes, Selectors, UserAction, UpdateType, Mode } from '../constants.js';

import { render, remove, replace, RenderPosition } from '../framework/render.js';

import FilmDetailsView from '../view/film-details-view.js';
import FilmDetailsControlsView from '../view/film-details-controls-view.js';
import FilmDetailsNewCommentView from '../view/film-details-new-comment-view.js';
import FilmDetailsCommentsListView from '../view/film-details-comments-list-view.js';

const bodyElement = document.querySelector('body');
const siteFooterElement = document.querySelector('.footer');

const hideOverflow = () => {
  bodyElement.classList.add(Classes.HIDE_OVERFLOW_CLASS);
};

const showOverflow = () => {
  bodyElement.classList.remove(Classes.HIDE_OVERFLOW_CLASS);
};

export default class FilmDetailsPresenter {
  #film = null;
  #filmComments = null;
  #filmDetailsComponent = null;
  #filmDetailsControlsComponent = null;
  #filmDetailsNewCommentComponent = null;
  #filmDetailsCommentsListComponent = null;
  #commentsModel = null;
  #changeData = null;
  mode = Mode.DEFAULT;

  constructor(commentsModel, changeData) {
    this.#commentsModel = commentsModel;
    this.#changeData = changeData;

    this.#commentsModel.addObserver(this.#handleModelEvent);
  }

  init = (film, filmComments) => {
    this.#film = film;
    this.#filmComments = filmComments;

    const prevFilmDetailsComponent = this.#filmDetailsComponent;

    this.#filmDetailsComponent = new FilmDetailsView(this.#film, this.#filmComments);

    this.#filmDetailsControlsComponent = new FilmDetailsControlsView(this.#film);
    this.#filmDetailsNewCommentComponent = new FilmDetailsNewCommentView(this.#film);
    this.#filmDetailsCommentsListComponent = new FilmDetailsCommentsListView(
      this.#film,
      this.#filmComments,
    );

    this.#filmDetailsComponent.setCloseButtonClickHandler(this.#handleFilmDetailsCloseBtnClick);

    this.#filmDetailsControlsComponent.setWatchlistClickHandler(this.#handleDetailWatchlistClick);
    this.#filmDetailsControlsComponent.setAlreadyWatchedClickHandler(
      this.#handleDetailsAlreadyWatchedClick,
    );
    this.#filmDetailsControlsComponent.setFavoriteClickHandler(this.#handleDetailsFavoriteClick);

    this.#filmDetailsCommentsListComponent.setDeleteClickHandler(this.#handleDeleteClick);

    this.#filmDetailsNewCommentComponent.setFormSubmitHandler(this.#handleFormSubmit);
    document.addEventListener('keydown', this.#onEscKeyDown);

    if (prevFilmDetailsComponent === null || this.mode === Mode.DEFAULT) {
      this.#renderFilmDetails();
      this.mode = 'popup';
    } else {
      replace(this.#filmDetailsComponent, prevFilmDetailsComponent);
      this.#renderFilmDetailsControls();
      this.#renderFilmDetailsCommentsList();
      this.#renderFilmDetailsNewComment();
    }
  };

  destroy = () => {
    remove(this.#filmDetailsComponent);
  };

  setUpdatingUserDetails = () => {
    this.#filmDetailsControlsComponent.updateElement({
      isDisabled: true,
    });
  };

  setSubmitting = () => {
    this.#filmDetailsNewCommentComponent.updateElement({
      isSubmitting: true,
    });
  };

  setDeleting = (commentIdForDelete) => {
    this.#filmDetailsCommentsListComponent.updateElement({
      isDeleting: true,
      commentIdForDelete,
    });
  };

  setAbortingUpdateUserDetails = () => {
    const resetFormState = () => {
      this.#filmDetailsControlsComponent.updateElement({
        isDisabled: false,
      });
    };

    this.#filmDetailsControlsComponent.shake(resetFormState);
  };

  setAbortingAddComment = () => {
    const resetFormState = () => {
      this.#filmDetailsNewCommentComponent.updateElement({
        isSubmitting: false,
      });
    };

    this.#filmDetailsNewCommentComponent.shake(resetFormState);
  };

  setAbortingDeleteComment = () => {
    const resetFormState = () => {
      this.#filmDetailsCommentsListComponent.updateElement({
        isDeleting: false,
      });
    };

    this.#filmDetailsCommentsListComponent.shake(resetFormState);
  };

  #handleFormSubmit = (payload) => {
    this.#changeData(UserAction.ADD_COMMENT, UpdateType.PATCH, payload);
  };

  #handleDeleteClick = (payload) => {
    this.#changeData(UserAction.DELETE_COMMENT, UpdateType.PATCH, payload);
  };

  #handleDetailWatchlistClick = () => {
    this.#changeData(UserAction.UPDATE_FILM_DETAILS, UpdateType.MINOR, {
      ...this.#film,
      userDetails: { ...this.#film.userDetails, watchlist: !this.#film.userDetails.watchlist },
    });
  };

  #handleDetailsAlreadyWatchedClick = () => {
    this.#changeData(UserAction.UPDATE_FILM_DETAILS, UpdateType.MINOR, {
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        alreadyWatched: !this.#film.userDetails.alreadyWatched,
      },
    });
  };

  #handleDetailsFavoriteClick = () => {
    this.#changeData(UserAction.UPDATE_FILM_DETAILS, UpdateType.MINOR, {
      ...this.#film,
      userDetails: { ...this.#film.userDetails, favorite: !this.#film.userDetails.favorite },
    });
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      remove(this.#filmDetailsComponent);
      document.removeEventListener('keydown', this.#onEscKeyDown);
      showOverflow();
      this.mode = Mode.DEFAULT;
    }
  };

  #handleFilmDetailsCloseBtnClick = () => {
    remove(this.#filmDetailsComponent);
    showOverflow();
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.mode = Mode.DEFAULT;
  };

  #renderFilmDetailsControls = () => {
    const filmDetailsInfo = document.querySelector(Selectors.FILM_DETAILS_INFO_WRAP);
    render(this.#filmDetailsControlsComponent, filmDetailsInfo, RenderPosition.AFTEREND);
  };

  #renderFilmDetailsNewComment = () => {
    const filmDetailsCommentsWrap = document.querySelector(Selectors.FILM_DETAILS_COMMENTS_WRAP);
    render(this.#filmDetailsNewCommentComponent, filmDetailsCommentsWrap);
  };

  #renderFilmDetailsCommentsList = () => {
    const filmDetailsCommentsTitle = document.querySelector(Selectors.FILM_DETAILS_COMMENTS_TITLE);
    render(
      this.#filmDetailsCommentsListComponent,
      filmDetailsCommentsTitle,
      RenderPosition.AFTEREND,
    );
  };

  #renderFilmDetails = () => {
    hideOverflow();
    render(this.#filmDetailsComponent, siteFooterElement, RenderPosition.AFTEREND);

    this.#renderFilmDetailsControls();
    this.#renderFilmDetailsCommentsList();
    this.#renderFilmDetailsNewComment();
  };

  #handleModelEvent = (event, payload) => {
    switch (event) {
      case UpdateType.PATCH:
        this.#commentsModel.init(payload.id).finally(() => {
          this.init(payload, this.#commentsModel.comments);
        });
        break;
    }
  };
}
