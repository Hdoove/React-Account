import {
    all
  } from 'redux-saga/effects';
  import account from './account';
  
  export default function* rootSaga() {
    yield all([account()]);
  }