import {
    handleActions
} from 'redux-actions';
import actions from '../actions/index';
import Immutable from "seamless-immutable";

const defaultState = Immutable({
    loading: false,
    accounts: [],
    all: 0
});

const reducer = handleActions(
    new Map([
        [
            actions.setLoading,
            (state, {
                payload
            }) =>
            state.set("loading", payload)
        ],
        [
            actions.setAccount,
            (state, {
                payload
            }) => 
            state.set("accounts", payload)
        ],
        [
            actions.setAll,
            (state, {
                payload
            }) =>
            state.set("all", payload)
        ]
    ]),
    defaultState
);

export default reducer;