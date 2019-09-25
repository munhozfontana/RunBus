import { createActions, createReducer } from 'reduxsauce';
import SeamlessImmutable from 'seamless-immutable';

// Action Types & Creators
const { Types, Creators } = createActions({
    loadRequestLinesNumber: ['lineNumber'],
    loadRequestLinesReference: ['typeOrigin', 'seqOrigin', 'typeDestiny', 'seqDestiny'],
    loadRequestLinesSense: ['codBairroStart', 'codBairroEnd'],
    loadFailureLines: ['error'],
    loadSuccessLines: ['data'],
});

export const LinesTypes = Types;
export default Creators;

// Initial State
export const INITIAL_STATE = SeamlessImmutable({
    data: [],
} as StateLines);

// Reducer
export const reducer = createReducer(INITIAL_STATE, {
    [Types.LOAD_REQUEST_LINES_NUMBER]: (state, { data }) => state.merge({ data }),
    [Types.LOAD_REQUEST_LINES_REFERENCE]: (state, { data }) => state.merge({ data }),
    [Types.LOAD_REQUEST_LINES_SENSE]: (state, { data }) => state.merge({ data }),
});

export interface StateLines {
    data: [];
}

export interface DispatchLines {
    loadRequestLinesNumber: Function;
    loadRequestLinesReference: Function;
    loadRequestLinesSense: Function;
    loadFailureLines: Function;
    loadSuccessLines: Function;
}
