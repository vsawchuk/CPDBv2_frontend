import { getDomainName, getPageRoot } from 'utils/url';

describe('getDomainName', function () {
  it('should return domain name', function () {
    getDomainName(
      'https://www.chicagocopa.org/wp-content/uploads/2018/05/1087699.SRI_.Final-Redacted-by-DV.pdf'
    ).should.eql('chicagocopa.org');
    getDomainName(
      'https://assets.documentcloud.org/documents/3252454/CRID-289965-CR.pdf'
    ).should.eql('documentcloud.org');
  });
});

describe('getPageRoot', function () {
  it('should return landing if url is /', function () {
    getPageRoot('/').should.eql('landing');
  });

  it('should return first section', function () {
    getPageRoot('/search/').should.eql('search');
    getPageRoot('/pinboard/abc123/').should.eql('pinboard');
    getPageRoot('/officer/123/').should.eql('officer');
  });
});
