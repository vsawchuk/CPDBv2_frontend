'use strict';

require('should');

import crawlersPage from './page-objects/crawlers-page';


describe('Crawlers Page', function () {
  beforeEach(function () {
    crawlersPage.open();
  });

  it('should render crawler table and breadcrumb', function () {
    crawlersPage.tableSection.crawlerNameHeader.getText().should.equal('CRAWLER');
    crawlersPage.tableSection.recentRunAtHeader.getText().should.equal('RECENT RUN');
    crawlersPage.tableSection.numNewDocumentsHeader.getText().should.equal('NEW DOCUMENTS');
    crawlersPage.tableSection.numDocumentsHeader.getText().should.equal('TOTAL DOCUMENTS');
    crawlersPage.tableSection.numSuccessfulRuns.getText().should.equal('SUCCESSFUL RUNS');

    crawlersPage.tableSection.firstCrawlerName.getText().should.equal('SUMMARY_REPORTS_COPA');
    crawlersPage.tableSection.firstRecentRunAt.getText().should.equal('2019-02-20');
    crawlersPage.tableSection.firstNumNewDocuments.getText().should.equal('0');
    crawlersPage.tableSection.firstNumDocuments.getText().should.equal('284');
    crawlersPage.tableSection.firstSuccessfulRuns.getText().should.equal('12');

    crawlersPage.tableSection.breadcrumbsItem.getText().should.equal('Crawler Tracker');
  });

  it('should open log file modal when click on crawler row and close it when click on close button', function () {
    crawlersPage.tableSection.firstCrawlerRow.click();
    crawlersPage.tableSection.logFileModal.waitForVisible();
    crawlersPage.tableSection.logFileModalTitle.getText().should.equal('SUMMARY_REPORTS_COPA - 2019-02-20');
    crawlersPage.tableSection.logFileCloseButton.click();
    crawlersPage.tableSection.logFileModal.waitForVisible(1000, true);
  });

  it('should go to document page when click on Documents button', function () {
    crawlersPage.tableSection.documentsButton.click();
    browser.getUrl().should.containEql('/documents/');
  });

  it('should able to scroll and should not open log file model when click on no log url crawler row', function () {
    crawlersPage.tableSection.rowCount().should.equal(20);

    browser.scroll(0, 99999);
    browser.pause(1000);

    crawlersPage.tableSection.rowCount().should.equal(25);
    crawlersPage.tableSection.lastCrawlerName.getText().should.equal('DOCUMENTCLOUD');
    crawlersPage.tableSection.lastRecentRunAt.getText().should.equal('2018-11-29');
    crawlersPage.tableSection.lastNumNewDocuments.getText().should.equal('0');
    crawlersPage.tableSection.lastNumDocuments.getText().should.equal('1235');
    crawlersPage.tableSection.lastSuccessfulRuns.getText().should.equal('1');

    crawlersPage.tableSection.lastCrawlerRow.click();
    crawlersPage.tableSection.logFileModal.waitForVisible(1000, true);
  });
});