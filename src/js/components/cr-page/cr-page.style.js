import {
  sanFranciscoTextFamily, softBlackColor, whiteTwoColor, sugarCaneColor, clayGray
} from 'utils/styles';


export const wrapperStyle = {
  position: 'relative',
  backgroundColor: sugarCaneColor,
  borderBottom: `1px solid ${whiteTwoColor}`
};

export const headerStyle = {
  backgroundColor: 'white'
};

export const summarySectionWrapperStyle = {
  paddingTop: '8px',
  backgroundColor: 'white',
  margin: '0 16px 16px 16px',
  border: `1px solid ${whiteTwoColor}`
};

export const overlayStyle = {
  width: '100%',
  minHeight: '100%',
  top: 0,
  backgroundColor: 'white',
  position: 'absolute',
  opacity: 0.5,
};

export const leftColumnStyle = {
  width: '320px',
  display: 'inline-block',
  paddingLeft: '16px',
  boxSizing: 'border-box',
  verticalAlign: 'top',
  paddingBottom: '24px'
};

export const rightColumnStyle = {
  width: 'calc(100% - 320px)',
  display: 'inline-block',
  boxSizing: 'border-box'
};

export const CRIDHeaderStyle = {
  fontFamily: sanFranciscoTextFamily,
  fontSize: '26px',
  fontWeight: 400,
  color: softBlackColor,
  paddingTop: '16px',
  paddingBottom: '16px',
  margin: '0 16px',
  borderBottom: `solid 1px ${whiteTwoColor}`
};

export const summaryTextStyle = {
  color: clayGray,
  fontSize: '14px',
  fontFamily: sanFranciscoTextFamily,
  fontWeight: 300
};
