import FilmsPresenter from './presenter/films-presenter.js';

import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';

const siteMainElement = document.querySelector('.main');

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel(filmsModel);

const filmsPresenter = new FilmsPresenter(siteMainElement, filmsModel, commentsModel);

filmsPresenter.init();
