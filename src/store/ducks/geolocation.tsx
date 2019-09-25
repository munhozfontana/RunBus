import { LatLng, Region } from 'react-native-maps';
import { createActions, createReducer } from 'reduxsauce';
import SeamlessImmutable from 'seamless-immutable';

// Action Types & Creators
const { Types, Creators } = createActions<any, DispatchGeolocation>({
    currentLocation: ['currentCoords'],
    initialLocationMap: ['coordsRegionInit'],
    requestPermission: null,
    requestCurrentLocation: null,
    permissionGeolocationSuccess: null,
    permissionGeolocationFailure: null,
});

export const GeoLocationTypes = Types;
export default Creators;

// Initial State
export const INITIAL_STATE = SeamlessImmutable({
    coordsRegionInit: null,
    currentCoords: null,
});

// Reducer
export const reducer = createReducer(INITIAL_STATE, {
    [Types.INITIAL_LOCATION_MAP]: (state, { coordsRegionInit }) => state.merge({ coordsRegionInit }),
    [Types.CURRENT_LOCATION]: (state, { currentCoords }) => state.merge({ currentCoords }),
    [Types.REQUEST_CURRENT_LOCATION]: state => state,
    [Types.REQUEST_PERMISSION]: state => state,
});

export interface StateGeolocation {
    coordsRegionInit: Region;
    currentCoords: Region;
}

export interface DispatchGeolocation {
    initialLocationMap: Function;
    currentLocation: Function;
    requestPermission: Function;
    requestCurrentLocation: Function;
    permissionGeolocationSuccess: Function;
    permissionGeolocationFailure: Function;
}
