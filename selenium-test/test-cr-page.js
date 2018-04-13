'use strict';

require('should');

import crPage from './page-objects/cr-page';


describe('CR page', function () {
  beforeEach(function () {
    crPage.open();
  });

  it('should display complaint content', function () {
    crPage.title.getText().should.equal('CR 1000000');

    crPage.accusedOfficers.title.getText().should.equal('25 ACCUSED OFFICERS');
    crPage.accusedOfficers.cardCount().should.equal(25);
    crPage.accusedOfficers.firstCard.rank.getText().should.equal('Officer');
    crPage.accusedOfficers.firstCard.name.getText().should.equal('Ridchard Sullivan');
    crPage.accusedOfficers.firstCard.metric.getText().should.equal('43 allegations1 sustained');
    crPage.accusedOfficers.firstCard.percentile.getText().should.equal('More than 99% of other officers');
    crPage.accusedOfficers.firstCard.demographic.getText().should.equal('41 year old, White, Male.');
    crPage.accusedOfficers.firstCard.category.getText().should.equal('False Arrest');
    crPage.accusedOfficers.firstCard.outcome.getText().should.equal('Reprimand');

    crPage.summarySection.firstVictim.getText().should.equal('Black, Male, Age 53');
    crPage.summarySection.firstComplainant.getText().should.equal('Black, Male, Age 53');
    crPage.summarySection.summary.getText().should.equal('Summary');

    crPage.attachments.cardCount().should.equal(10);
    crPage.attachments.firstCard.title.getText().should.equal('CR Document');
    crPage.attachments.firstCard.element.getAttribute('href').should.equal('http://cr-document.com/');

    crPage.investigationTimeline.getText().should.equal(
      'Sep 23, 2003\nIncident Occurs\nComplaint Filed\nMar 16, 2004\nInvestigation Closed'
    );

    // crPage.investigator.itemCount.should.equal(2);
    // crPage.investigator.firstItemName.getText().should.equal('Lauren Skol');

    // crPage.policeWitness.itemCount.should.equal(2);
    // crPage.policeWitness.firstItemName.getText().should.equal('Raymond Piwinicki');
    // crPage.policeWitness.firstItemMetric.getText().should.equal('3 allegations 0 sustained');

    crPage.location.address.getText().should.equal('3510 Michigan Ave, Chicago, IL 60653');
    crPage.location.locationType.getText().should.equal('Police Building');
    crPage.location.beat.getText().should.equal('2551');
  });

  it('should show full list of accused officers when click on show more button', function () {
    // crPage.accusedOfficers.lastCard.isVisibleWithinViewport().should.be.false();
    crPage.accusedOfficers.showMoreButton.isVisible().should.be.true();
    crPage.accusedOfficers.showMoreButton.click();
    // crPage.accusedOfficers.lastCard.isVisibleWithinViewport().should.be.true();
    crPage.accusedOfficers.showMoreButton.isVisible().should.be.false();
  });

  it('should navigate to officer page when we click on accused officer card', function () {
    crPage.accusedOfficers.firstCard.element.click();
    browser.getUrl().should.match(/\/officer\/1\/$/);
  });

  it('should show request document modal when clicks on "Request Document"', function () {
    crPage.attachments.documentRequestButton.click();
    crPage.documentRequestModal.emailInput.waitForVisible();
  });

  it('should accept valid email, and close modal after 1.5s', function () {
    crPage.attachments.documentRequestButton.click();
    crPage.documentRequestModal.emailInput.waitForVisible();
    crPage.documentRequestModal.emailInput.setValue('valid@email.com');
    crPage.documentRequestModal.submitButton.click();
    crPage.documentRequestModal.messageBox.waitForVisible();
    crPage.documentRequestModal.messageBox.getText().should.equal('Thanks for subscribing.');
    browser.waitForVisible('.test--generic-modal-content', 2000, true);
    crPage.attachments.documentRequestButton.getText().should.equal('Documents Requested   ✔');
  });

  it('should ignore invalid email', function () {
    crPage.attachments.documentRequestButton.click();
    crPage.documentRequestModal.emailInput.waitForVisible();
    crPage.documentRequestModal.emailInput.setValue('invalid@email.com');
    crPage.documentRequestModal.submitButton.click();
    crPage.documentRequestModal.messageBox.waitForVisible();
    crPage.documentRequestModal.messageBox.getText().should.equal('Sorry, we can not subscribe your email');
  });
});
