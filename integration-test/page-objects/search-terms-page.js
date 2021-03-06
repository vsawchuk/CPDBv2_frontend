'use strict';

import { map } from 'lodash';

import Page from './page';
import Section from './sections/section';


class PreviewPane extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      title: '.test--preview-pane-title',
      description: '.test--preview-pane-description',
      descriptionLink: '//div[contains(@class, "test--preview-pane-description")]//a',
      callToAction: '.test--call-to-action',
    });
  }
}


class CategoryMainPanelSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      categoryColumns: '.test--category-column',
      firstCategoryItem: '.test--category-item',
      firstCategoryHeader: '.test--category-header',
      focusedItem: '(//div[@class="test--category-column"]//div[contains(@style,"background: rgb(197, 218, 253)")])[1]',
    });
  }

  getColumnNames() {
    return map($$('.test--category-header'), ({ getText }) => (getText()));
  }

  getCategoryHeader(headerIndex) {
    return $(`(//div[contains(@class, 'test--category-header')])[${headerIndex + 1}]`);
  }

  getItemInColumn(columnIndex, itemIndex) {
    return $(`(
        //div[contains(@class, 'test--category-column')][${columnIndex + 1}]
        //div[contains(@class, 'test--category-item')]
      )[${itemIndex + 1}]
        //div[contains(@class, 'link--transition')]
    `);
  }

  getCategoryItemSelector(itemIndex) {
    return `(//div[@class='term-item test--category-item'])[${itemIndex}]`;
  }

  getCategoryNameAtItem(itemIndex) {
    return $(`${this.getCategoryItemSelector(itemIndex)}//div[@class='link--transition']`);
  }

  getCategoryDescriptionAtItem(itemIndex) {
    return $(`${this.getCategoryItemSelector(itemIndex)}//div[@class='test--category-item-description']`);
  }
}

class BottomLinksSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      backToFrontPageLink: '.search-term-back-front-page-link',
    });
  }
}

class SearchTermsPage extends Page {
  constructor() {
    super();
    this.categoryMainPanel = new CategoryMainPanelSection();
    this.bottomLinks = new BottomLinksSection();
    this.previewPane = new PreviewPane();
    this.prepareElementGetters({
      input: '.search-box-text-input',
      title: '.search-term-title',
      clearSearchButton: '.test--search-close-button',
    });
  }

  open() {
    super.open('/search/');
  }
}

module.exports = new SearchTermsPage();
