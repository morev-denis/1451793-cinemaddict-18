import { createElement } from '../render.js';

const footerStatisticsTemplate = () => '<p>130 291 movies inside</p>';

export default class FooterStatisticsView {
  getTemplate() {
    return footerStatisticsTemplate;
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
