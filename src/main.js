import { AUTHORIZATION, END_POINT } from './constants.js';

import FilmsPresenter from './presenter/films-presenter.js';

import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';
import FilterModel from './model/filter-model.js';
import FilmsApiService from './films-api-service.js';
import CommentsApiService from './comments-api-service.js';

const siteMainElement = document.querySelector('.main');

const filmsModel = new FilmsModel(new FilmsApiService(END_POINT, AUTHORIZATION));
const commentsModel = new CommentsModel(new CommentsApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();

const filmsPresenter = new FilmsPresenter(siteMainElement, filmsModel, commentsModel, filterModel);

filmsModel.init();
filmsPresenter.init();
