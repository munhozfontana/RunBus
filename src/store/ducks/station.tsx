import { createActions, createReducer } from 'reduxsauce';
import SeamlessImmutable from 'seamless-immutable';

// Action Types & Creators
const { Types, Creators } = createActions({
    loadRequestStations: null,
    loadFailureStation: ['error'],
    loadSuccessStation: ['data'],
});

export const StationTypes = Types;
export default Creators;

// Initial State
export const INITIAL_STATE = SeamlessImmutable({
    data: null,
});

// Reducer
export const reducer = createReducer(INITIAL_STATE, {
    [Types.LOAD_SUCCESS_STATION]: (state, { data }) => state.merge({ data }),
    [Types.LOAD_REQUEST_STATIONS]: state => state,
});

export interface StateStation {
    data: {};
}

export interface DispatchStation {
    loadRequestStations: Function;
    loadFailureStation: Function;
    loadSuccessStation: Function;
}
