import { render } from './framework/render.js';

import { Selectors } from './constants.js';

import HeaderProfileView from './view/header-profile-view.js';
import MainNavigationView from './view/main-navigation-view.js';
import FooterStatisticsView from './view/footer-statistics-view.js';

import FilmsPresenter from './presenter/films-presenter.js';

import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const footerStatisticsElement = siteFooterElement.querySelector(Selectors.FOOTER_STATISTICS);

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel(filmsModel);

const filmsPresenter = new FilmsPresenter(siteMainElement, filmsModel, commentsModel);

render(new HeaderProfileView(), siteHeaderElement);
render(new MainNavigationView(), siteMainElement);
render(new FooterStatisticsView(), footerStatisticsElement);

filmsPresenter.init();
