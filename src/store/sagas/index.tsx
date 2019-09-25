import { all, takeLatest, takeLeading } from 'redux-saga/effects';
import { GeoLocationTypes } from '../ducks/geolocation';
import { LinesTypes } from '../ducks/lines';
import { StationTypes } from '../ducks/station';
import { requestCurrentLocation, requestPermission } from './geolocation';
import { loadRequestLinesNumber, loadRequestLinesReference } from './lines';
import { loadRequestStation } from './station';

export default function* rootSaga() {
    return yield all([
        takeLatest(StationTypes.LOAD_REQUEST_STATIONS, loadRequestStation),
        takeLatest(LinesTypes.LOAD_REQUEST_LINES_NUMBER, loadRequestLinesNumber),
        takeLatest(LinesTypes.LOAD_REQUEST_LINES_REFERENCE, loadRequestLinesReference),
        takeLatest(GeoLocationTypes.REQUEST_PERMISSION, requestPermission),
        takeLeading(GeoLocationTypes.REQUEST_CURRENT_LOCATION, requestCurrentLocation),
    ]);
}
