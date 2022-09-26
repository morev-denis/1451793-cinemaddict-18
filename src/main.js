import FilmsPresenter from './presenter/films-presenter.js';

import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';
import FilterModel from './model/filter-model.js';

const siteMainElement = document.querySelector('.main');

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel(filmsModel);
const filterModel = new FilterModel();

const filters = [
  {
    type: 'all',
    name: 'ALL',
    count: 0,
  },
  {
    type: 'watchlist',
    name: 'WATCHLIST',
    count: 0,
  },
  {
    type: 'history',
    name: 'HISTORY',
    count: 0,
  },
  {
    type: 'favorites',
    name: 'FAVORITES',
    count: 0,
  },
];

const filmsPresenter = new FilmsPresenter(
  siteMainElement,
  filmsModel,
  commentsModel,
  filters,
  'all',
);

filmsPresenter.init();
