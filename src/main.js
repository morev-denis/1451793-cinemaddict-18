import SortView from './view/sort-view.js';
import { render } from './render.js';

const siteMainElement = document.querySelector('.main');

render(new SortView(), siteMainElement);
