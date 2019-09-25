import { PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { call, put, select } from 'redux-saga/effects';
import Creators, { StateGeolocation } from '../ducks/geolocation';
import { Region } from 'react-native-maps';
import { Fragment } from 'react';

export function* requestPermission() {
    try {
        const granted = yield call(PermissionsAndroid.request, PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
            title: 'Permissão a de acesso a sua localização',
            message: 'O DFbus precisa da sua localização para funcionar corretamente',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
        });

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            yield put(Creators.permissionGeolocationSuccess());
        } else {
            yield put(Creators.permissionGeolocationFailure());
        }
    } catch (err) {
        console.warn(err);
    }
}

export function* requestCurrentLocation() {
    try {
        const getCurrentPosition = () =>
            new Promise((resolve, reject) =>
                Geolocation.getCurrentPosition(resolve, reject, {
                    enableHighAccuracy: true,
                    timeout: 1000,
                    maximumAge: 1000,
                }),
            );

        const currentPostion = yield call(getCurrentPosition);
        const { coordsRegionInit, currentCoords }: StateGeolocation = yield select(state => state.geolocation);

        const { latitude, longitude } = yield currentPostion.coords;
        if (!coordsRegionInit) {
            yield put(
                Creators.initialLocationMap({
                    latitude,
                    longitude,
                    latitudeDelta: 0.012,
                    longitudeDelta: 0.012,
                } as Region),
            );
            return yield put(Creators.currentLocation(currentPostion.coords));
        }

        // if (localCoords && localCoords.latitude !== latitude && localCoords.longitude !== longitude) {
        yield put(Creators.currentLocation(currentPostion.coords));
        // }
    } catch (error) {}
}
