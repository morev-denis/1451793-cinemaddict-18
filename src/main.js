import HeaderProfileView from './view/header-profile-view.js';
import SortView from './view/sort-view.js';
import { render } from './render.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

render(new HeaderProfileView(), siteHeaderElement);
render(new SortView(), siteMainElement);
