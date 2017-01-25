import { createAction } from 'redux-actions';

import { post } from 'actions/common/async-action';
import { SIGNIN_URL, RESET_PASSWORD_URL } from 'utils/constants';


export const SIGNIN_REQUEST = 'SIGNIN_REQUEST';
export const SIGNIN_REQUEST_SUCCESS = 'SIGNIN_REQUEST_SUCCESS';
export const SIGNIN_REQUEST_FAILURE = 'SIGNIN_REQUEST_FAILURE';

export const signIn = post(SIGNIN_URL, [
  SIGNIN_REQUEST, SIGNIN_REQUEST_SUCCESS, SIGNIN_REQUEST_FAILURE
]);


export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';

export const resetPassword = post(RESET_PASSWORD_URL, [
  RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE
]);

export const OPEN_FORGOT_PASSWORD_MODAL = 'OPEN_FORGOT_PASSWORD_MODAL';
export const CLOSE_FORGOT_PASSWORD_MODAL = 'CLOSE_FORGOT_PASSWORD_MODAL';

export const openForgotPasswordModal = createAction(OPEN_FORGOT_PASSWORD_MODAL);
export const closeForgotPasswordModal = createAction(CLOSE_FORGOT_PASSWORD_MODAL);

export const RECEIVE_TOKEN_FROM_COOKIE = 'RECEIVE_TOKEN_FROM_COOKIE';
export const receiveTokenFromCookie = createAction(RECEIVE_TOKEN_FROM_COOKIE);
