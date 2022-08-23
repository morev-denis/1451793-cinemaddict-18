import { render } from './render.js';

import HeaderProfileView from './view/header-profile-view.js';
import MainNavigationView from './view/main-navigation-view.js';
import SortView from './view/sort-view.js';
import FooterStatisticsView from './view/footer-statistics-view.js';

import FilmsPresenter from './presenter/films-presenter.js';
import FilmDetailsPresenter from './presenter/film-details-presenter.js';

import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';

const filmsPresenter = new FilmsPresenter();
const filmDetailsPresenter = new FilmDetailsPresenter();

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const footerStatisticsElement = siteFooterElement.querySelector('.footer__statistics');

render(new HeaderProfileView(), siteHeaderElement);
render(new MainNavigationView(), siteMainElement);
render(new SortView(), siteMainElement);
render(new FooterStatisticsView(), footerStatisticsElement);

filmsPresenter.init(siteMainElement, filmsModel);
filmDetailsPresenter.init(siteFooterElement, filmsModel, commentsModel);
