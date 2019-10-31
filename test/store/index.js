import configureStore from 'store';
import { OFFICER_EDIT_TYPES, CR_EDIT_TYPES, TRR_EDIT_TYPES } from 'utils/constants';


function setUp() {
  const store = configureStore(undefined);
  let currentState;

  const observer = () => {
    currentState = store.getState();
  };

  function getCurrentState() {
    return currentState;
  }

  let unsubscribe = store.subscribe(observer);
  observer();

  return {
    store,
    getCurrentState,
    unsubscribe,
  };
}

describe('store', function () {
  it('should have initial state', function () {
    const { getCurrentState } = setUp();
    getCurrentState().should.eql({
      pathname: null,
      landingPage: {
        activityGrid: {
          cards: [],
          isRequesting: false,
          headerEditModeOn: false,
        },
        officersByAllegation: {
          cards: [],
          isRequesting: false,
          headerEditModeOn: false,
        },
        recentDocument: {
          cards: [],
          isRequesting: false,
          headerEditModeOn: false,
        },
        complaintSummaries: {
          cards: [],
          isRequesting: false,
          headerEditModeOn: false,
        },
        heatMap: {
          citySummary: {},
          communities: null,
          clusterGeoJson: null,
        },
      },
      authentication: {
        loginErrorMessage: null,
        loginSuccessMessage: null,
        forgotPasswordErrorMessage: null,
        apiAccessToken: null,
        showForgotPasswordModal: false,
      },
      cms: {
        pages: {},
      },
      pageLoading: false,
      popups: [],
      routing: {
        locationBeforeTransitions: null,
      },
      searchPage: {
        navigation: { 'itemIndex': 0 },
        isRequesting: false,
        suggestionGroups: {
          meta: {},
        },
        pagination: {},
        contentType: null,
        recentSuggestions: [],
        recentSuggestionsRequested: false,
        tags: [],
        query: '',
        searchTerms: {
          categories: [],
          hidden: true,
          navigation: {
            itemIndex: 0,
          },
        },
      },
      inlineAliasAdminPage: {},
      crPage: {
        isRequesting: false,
        crid: null,
        officerId: null,
        attachmentRequest: {
          request: {
            isRequested: false,
            message: '',
          },
          subscribedCRIDs: {},
        },
        relatedComplaints: {
          relatedByCategory: {
            count: 0,
            pagination: {
              next: null,
              previous: null,
            },
            cards: {
              meta: {
                crPageCrid: null,
                distance: null,
              },
              cards: [],
            },
          },
          relatedByOfficer: {
            count: 0,
            pagination: {
              next: null,
              previous: null,
            },
            cards: {
              meta: {
                crPageCrid: null,
                distance: null,
              },
              cards: [],
            },
          },
        },
        editModeOn: {
          [CR_EDIT_TYPES.NO_ATTACHMENT_TEXT]: false,
          [CR_EDIT_TYPES.DOCUMENT_REQUEST_INSTRUCTION]: false,
          [CR_EDIT_TYPES.NEW_DOCUMENT_NOTIFICATIONS_INSTRUCTION]: false,
        },
      },
      trrPage: {
        trrId: null,
        data: {},
        isRequesting: false,
        attachmentRequest: {
          request: {
            isRequested: false,
            message: '',
          },
          subscribedTRRIds: {},
        },
        editModeOn: {
          [TRR_EDIT_TYPES.NO_ATTACHMENT_TEXT]: false,
          [TRR_EDIT_TYPES.DOCUMENT_REQUEST_INSTRUCTION]: false,
        },
      },
      crs: {},
      officerPage: {
        activeTab: null,
        currentTab: 'TIMELINE',
        fullName: '',
        breadcrumbCachedFullName: '',
        isRequesting: false,
        officerId: null,
        summary: {},
        newTimeline: {
          filter: {
            label: 'All',
            kind: ['CR', 'FORCE', 'AWARD'],
          },
          isRequesting: false,
          items: [],
        },
        coaccusals: {
          isRequesting: false,
          items: [],
        },
        editModeOn: {
          [OFFICER_EDIT_TYPES.TRIANGLE]: false,
          [OFFICER_EDIT_TYPES.SCALE]: false,
          [OFFICER_EDIT_TYPES.NO_DATA_RADAR_CHART]: false,
        },
        zipFileUrl: { withDocs: '', withoutDocs: '' },
      },
      unitProfilePage: {
        isRequesting: false,
        summary: {},
      },
      documentPage: {
        data: {},
        titleEditModeOn: false,
        tagsEditModeOn: false,
        tagsErrorMessages: null,
        textContentEditModeOn: false,
      },
      genericModal: {
        activeModal: null,
      },
      breadcrumb: {
        breadcrumbs: [],
      },
      breadcrumbsMapping: {},
      headers: {
        shareableHeader: {
          scrollPosition: null,
        },
        slimHeader: {
          demoVideoSectionEditModeOn: false,
          logoSectionEditModeOn: false,
          videoInfo: [],
        },
      },
      embed: {
        officers: [],
      },
      documentsOverviewPage: {
        documents: {
          data: {},
          match: '',
        },
        documentsOrder: {
          data: [],
          match: '',
        },
        pagination: {},
      },
      documentDeduplicatorPage: {
        documents: {
          data: {},
          crid: '',
        },
        documentsOrder: {
          data: [],
          crid: '',
        },
        pagination: {},
      },
      crawlersPage: {
        crawlers: [],
        currentCrawlerId: null,
        pagination: {},
      },
      socialGraphPage: {
        networkData: {
          currentNetworkTab: 'Timeline',
          showTimelineTab: true,
          graphData: {},
          networkAllegations: [],
          networkOfficers: [],
          selectedOfficerId: null,
          timelineIdx: 0,
          refreshIntervalId: null,
          timelineIdxTriggerChange: 0,
          selectedEdge: null,
          selectedCrid: null,
          requesting: false,
          networkAllegationsRequesting: false,
          networkOfficersRequesting: false,
        },
        currentMainTab: 'NETWORK',
        geographicData: {
          crid: null,
          trrId: null,
          isCrsRequested: false,
          isTrrsRequested: false,
          mapCrsData: [],
          mapTrrsData: [],
          mapCrsDataTotalCount: null,
          mapTrrsDataTotalCount: null,
          previewPaneCrsData: [],
          previewPaneTrrsData: [],
        },
      },
      pinboardPage: {
        pinboard: {
          id: null,
          title: '',
          description: '',
          crids: [],
          'officer_ids': [],
          'trr_ids': [],
          saving: false,
          needRefreshData: false,
          hasPendingChanges: false,
          isPinboardRestored: false,
        },
        graphData: { requesting: false, data: {} },
        geographicData: {
          clearAllMarkers: false,
          mapCrsData: [],
          mapTrrsData: [],
          mapCrsDataTotalCount: null,
          mapTrrsDataTotalCount: null,
          crsRequesting: false,
          trrsRequesting: false,
        },
        currentTab: null,
        relevantDocuments: {
          requesting: false,
          items: [],
          count: 0,
          pagination: { next: null, previous: null },
        },
        relevantCoaccusals: {
          requesting: false,
          items: [],
          count: 0,
          pagination: { next: null, previous: null },
        },
        relevantComplaints: {
          requesting: false,
          items: [],
          count: 0,
          pagination: { next: null, previous: null },
        },
        redirect: false,
        initialRequested: false,
        pinboards: [],
        isShownPinboardsList: false,
        officerItems: { requesting: false, items: [], removingItems: [] },
        crItems: { requesting: false, items: [], removingItems: [] },
        trrItems: { requesting: false, items: [], removingItems: [] },
        timelineIdx: 0,
        refreshIntervalId: null,
        focusedItem: {},
        pinItemFromPreviewPane: {},
        editModeOn: {
          EMPTY_PINBOARD_DESCRIPTION: false,
          EMPTY_PINBOARD_TITLE: false,
        },
      },
      videoModal: {
        active: false,
      },
    });
  });
});
