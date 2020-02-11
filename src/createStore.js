import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import reducer from './store/reducer';

export const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, logger];

function configureStore() {
  const store = createStore(
    reducer,
    compose(applyMiddleware(...middlewares))
  );

  return store;
}

export default configureStore();
