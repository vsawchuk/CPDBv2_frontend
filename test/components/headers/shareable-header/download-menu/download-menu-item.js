import React from 'react';
import { shallow } from 'enzyme';
import { spy, stub } from 'sinon';

import DownloadMenuItem from 'components/headers/shareable-header/download-menu/download-menu-item';
import * as tracking from 'utils/tracking';
import LoadingSpinner from 'components/common/loading-spinner';


describe('DownloadMenu component', function () {
  it(
    'should render download image by default and change to downloading after being clicked',
    function () {
      const fetchOfficerZipFileUrlStub = stub();

      const wrapper = shallow(
        <DownloadMenuItem
          officerId={ 123 }
          kind='without_docs'
          zipFileUrl=''
          fetchOfficerZipFileUrl={ fetchOfficerZipFileUrlStub }
        />
      );

      const text = wrapper.find('.item-title');
      text.text().should.equal('Data');

      wrapper.simulate('click');

      wrapper.find(LoadingSpinner).exists().should.be.true();
      wrapper.find('.download-menu-item-img').exists().should.be.false();

      fetchOfficerZipFileUrlStub.should.be.calledWith(123);
    }
  );

  it('should start download when being clicked if zipFileUrl is available', function () {
    const fetchOfficerZipFileUrlStub = stub();
    const triggerDownloadSpy = spy(DownloadMenuItem.prototype, 'triggerDownload');

    const wrapper = shallow(
      <DownloadMenuItem
        officerId={ 123 }
        kind='without_docs'
        zipFileUrl='lvh.me/file.zip'
        fetchOfficerZipFileUrl={ fetchOfficerZipFileUrlStub }
      />
    );

    triggerDownloadSpy.should.not.be.called();
    wrapper.state('requested').should.be.false();

    wrapper.simulate('click');

    triggerDownloadSpy.should.be.calledWith('lvh.me/file.zip');
  });

  it('should throttle continues download requests', function () {
    const fetchOfficerZipFileUrlStub = stub();
    const triggerDownloadSpy = spy(DownloadMenuItem.prototype, 'triggerDownload');

    const wrapper = shallow(
      <DownloadMenuItem
        officerId={ 123 }
        kind='without_docs'
        zipFileUrl='lvh.me/file.zip'
        fetchOfficerZipFileUrl={ fetchOfficerZipFileUrlStub }
      />
    );

    triggerDownloadSpy.should.not.be.called();

    wrapper.simulate('click');
    wrapper.simulate('click');
    wrapper.simulate('click');

    triggerDownloadSpy.should.be.calledOnce();
  });

  it('should start download when zipFileUrl is ready', function () {
    const fetchOfficerZipFileUrlStub = stub();
    const triggerDownloadSpy = spy(DownloadMenuItem.prototype, 'triggerDownload');

    const wrapper = shallow(
      <DownloadMenuItem
        officerId={ 123 }
        kind='without_docs'
        zipFileUrl=''
        fetchOfficerZipFileUrl={ fetchOfficerZipFileUrlStub }
      />
    );

    wrapper.simulate('click');
    wrapper.state('requested').should.be.true();
    triggerDownloadSpy.should.not.be.called();

    wrapper.setProps({
      officerId: 123,
      kind: 'without_docs',
      zipFileUrl: 'lvh.me/file.zip',
      fetchOfficerZipFileUrl: fetchOfficerZipFileUrlStub,
    });

    triggerDownloadSpy.should.be.calledWith('lvh.me/file.zip');
    wrapper.state('requested').should.be.false();
  });

  it('should send google analytics when clicked', function () {
    const fetchOfficerZipFileUrlStub = stub();
    const triggerDownloadSpy = spy(DownloadMenuItem.prototype, 'triggerDownload');
    const stubTrackOfficerDownload = stub(tracking, 'trackOfficerDownload');

    const wrapper = shallow(
      <DownloadMenuItem
        officerId={ 123 }
        kind='without_docs'
        zipFileUrl=''
        fetchOfficerZipFileUrl={ fetchOfficerZipFileUrlStub }
      />
    );

    wrapper.simulate('click');
    wrapper.state('requested').should.be.true();
    triggerDownloadSpy.should.not.be.called();
    stubTrackOfficerDownload.should.be.calledWith(123, 'request_download_urls', 'without_docs');

    wrapper.setProps({
      officerId: 123,
      kind: 'without_docs',
      zipFileUrl: 'lvh.me/file.zip',
      fetchOfficerZipFileUrl: fetchOfficerZipFileUrlStub,
    });

    triggerDownloadSpy.should.be.calledWith('lvh.me/file.zip');
    stubTrackOfficerDownload.should.be.calledWith(123, 'download', 'without_docs');
    wrapper.state('requested').should.be.false();
  });
});
