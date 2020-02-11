import {
    combineReducers
  } from 'redux';
  import account from './account';
  
  const reducer = combineReducers({
    account
  });
  
  export default reducer;