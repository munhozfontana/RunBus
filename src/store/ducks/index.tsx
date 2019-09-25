import { combineReducers } from 'redux';
import { reducer as geolocation } from './geolocation';
import { reducer as lines } from './lines';
import { reducer as station } from './station';

export default combineReducers({
    geolocation,
    lines,
    station,
});
