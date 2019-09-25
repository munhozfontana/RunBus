import { call, put } from 'redux-saga/effects';
import api from '../../services/api';
import Actions from '../ducks/lines';

export function* loadRequestLinesNumber(lineNumber: string) {
    try {
        const response = yield call(api, lineNumber);
        yield put(Actions.loadSuccessLines(response.data));
    } catch (error) {
        yield put(Actions.loadFailureLines());
    }
}

export function* loadRequestLinesReference({ typeOrigin, seqOrigin, typeDestiny, seqDestiny }: any) {
    try {
        const response = yield call(api, `${typeOrigin}/${seqOrigin}/${typeDestiny}/${seqDestiny}`);
        yield put(Actions.loadSuccessLines('data'));
    } catch (error) {
        yield put(Actions.loadFailureLines(error));
    }
}

export function* loadRequestLinesSense({ codBairroStart, codBairroEnd }: any) {
    try {
        const response = yield call(api, `${codBairroStart}/${codBairroStart}`);
        yield put(Actions.loadSuccessLines('data'));
    } catch (error) {
        yield put(Actions.loadFailureLines(error));
    }
}
