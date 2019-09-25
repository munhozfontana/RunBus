import { call, put } from 'redux-saga/effects';
import api from '../../services/api';
import Actions from '../ducks/station';

export function* loadRequestStation() {
    try {
        const response = yield call(api, '/parada/geo/paradas');
        yield put(Actions.loadSuccessStation(response.data));
    } catch (error) {
        yield put(Actions.loadFailureStation());
    }
}
