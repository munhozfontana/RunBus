import Proj4js from 'proj4';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Animated, Dimensions } from 'react-native';
import MapView, { LatLng, MarkerAnimated, Region } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Feather';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import InputSearch from '../../components/InputSearch';
import CreatorsGeolocation, { DispatchGeolocation, StateGeolocation } from '../../store/ducks/geolocation';
import CreatorsStation, { DispatchStation, StateStation } from '../../store/ducks/station';
import { Container as MapContainer, customStyled, Map, MarkerLocalContainer, MarkerLocalItem } from './styles';

function Home({
    station,
    geolocation,
    creatorsGeolocation,
    creatorsStation,
}: {
    station: StateStation;
    geolocation: StateGeolocation;
    creatorsGeolocation: DispatchGeolocation;
    creatorsStation: DispatchStation;
}) {
    const getCoords = (): Region => {
        const { latitude, longitude } = geolocation.coordsRegionInit;
        return { latitude, longitude, latitudeDelta: 0.012, longitudeDelta: 0.012 } as Region;
    };

    const moveMap = ({ latitude, longitude }: LatLng) => {
        const { latitudeDelta, longitudeDelta } = getCoords();
        setState(prevState => {
            return { ...prevState, focusMap: { latitude, longitude, latitudeDelta, longitudeDelta } };
        });
    };

    const initialState = {
        map: {
            top: new Animated.Value(Dimensions.get('window').height),
            size: new Animated.Value(0),
            opacity: new Animated.Value(0),
        },
        focusMap: {} as Region,
    };

    const [state, setState] = useState(initialState);
    const [previusCoords, setPreviusCoords] = useState<LatLng>({ latitude: null, longitude: null });
    const [stations, setStations] = useState<any[]>([]);

    const initAnimateMap = () => {
        return Animated.sequence([
            Animated.delay(1000),
            Animated.spring(state.map.top, {
                velocity: 0.2,
                toValue: 0,
                bounciness: 10,
            }),
        ]);
    };

    const renderStations = () => {
        const data = station.data;
        let distanceIndex: Array<any> = [];

        data.features
            .map(item => {
                const { coordinates } = item.geometry;
                const objItem = {
                    properties: item.properties,
                    distance: null,
                    coordenadaConvertida: Proj4js('EPSG:3857').inverse([coordinates[0], coordinates[1]]),
                };
                return filterByDistance(objItem, 2000);
            })
            .forEach(item => {
                item && distanceIndex.push(item);
            });

        distanceIndex = distanceIndex.sort(function(first, second) {
            return first.distance < second.distance ? -1 : first.distance > second.distance ? 1 : 0;
        });

        setStations(distanceIndex.slice(0, 5));
    };

    const filterByDistance = (item: any, range: number) => {
        const distance = getDistanceFromLatLonInKm(geolocation.currentCoords, {
            latitude: item.coordenadaConvertida[1],
            longitude: item.coordenadaConvertida[0],
        } as LatLng);

        if (distance < range) {
            item.distance = distance;
            return item;
        }
        return null;
    };

    const getDistanceFromLatLonInKm = (position1: LatLng, position2: LatLng): number => {
        const deg2rad = function(deg) {
                return deg * (Math.PI / 180);
            },
            R = 6371,
            dLat = deg2rad(position2.latitude - position1.latitude),
            dLng = deg2rad(position2.longitude - position1.longitude),
            a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(deg2rad(position1.latitude)) *
                    Math.cos(deg2rad(position1.latitude)) *
                    Math.sin(dLng / 2) *
                    Math.sin(dLng / 2),
            c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return parseFloat((R * c * 1000).toFixed());
    };

    useEffect(() => {
        initAnimateMap().start();
        creatorsGeolocation.requestPermission();
        creatorsStation.loadRequestStations();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // const shouldUpdateTitle = useShouldRecalculate(
    //     () => return nextProps.latitude !== this.props.latitude && nextProps.longitude !== this.props.longitude;
    //   );

    //   useEffect(() => {
    //     document.title = `You clicked ${count} times`;
    //   }, [shouldUpdateTitle]);

    useEffect(() => {
        const currentLocationInterval = () => {
            creatorsGeolocation.requestCurrentLocation();
        };
        const intervalVar = setInterval(currentLocationInterval, 10000);

        if (geolocation.currentCoords) {
            clearInterval(intervalVar);
            if (!previusCoords.latitude && !previusCoords.longitude) {
                updateStatePreviusCoords();
            }

            if (geolocation.currentCoords.latitude !== previusCoords.latitude) {
                updateStatePreviusCoords();
                renderStations();
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [geolocation.currentCoords]);

    return (
        <React.Fragment>
            {geolocation.coordsRegionInit && geolocation.currentCoords && (
                <MapContainer>
                    <Map
                        style={{
                            top: 0,
                        }}
                        as={Animated.View}
                    >
                        <MapView
                            onPoiClick={event => console.tron.log(event)}
                            customMapStyle={customStyled}
                            style={{ height: Dimensions.get('window').height, width: Dimensions.get('window').width }}
                            initialRegion={geolocation.coordsRegionInit}
                        >
                            <MarkerAnimated tracksViewChanges={false} coordinate={geolocation.currentCoords}>
                                <MarkerLocalContainer>
                                    <MarkerLocalItem />
                                </MarkerLocalContainer>
                            </MarkerAnimated>

                            {stations.length !== 0 &&
                                stations.map(elemento => (
                                    <MarkerAnimated
                                        tracksViewChanges={false}
                                        key={elemento.coordenadaConvertida[1] + elemento.coordenadaConvertida[0]}
                                        coordinate={{
                                            latitude: elemento.coordenadaConvertida[1],
                                            longitude: elemento.coordenadaConvertida[0],
                                        }}
                                        title={`${elemento.distance} Metros`}
                                    >
                                        <Icon
                                            style={{ position: 'absolute' }}
                                            name="target"
                                            size={30}
                                            color="#A960E1"
                                        />
                                    </MarkerAnimated>
                                ))}
                        </MapView>
                    </Map>

                    <InputSearch></InputSearch>
                </MapContainer>
            )}
        </React.Fragment>
    );

    function updateStatePreviusCoords() {
        setPreviusCoords((lastState: LatLng) => {
            return {
                ...lastState,
                latitude: geolocation.currentCoords.latitude,
                longitude: geolocation.currentCoords.longitude,
            };
        });
    }
}

const mapStateProps = ({ geolocation, station }: { geolocation: any; station: any }) => ({
    geolocation,
    station,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        creatorsGeolocation: bindActionCreators(CreatorsGeolocation, dispatch),
        creatorsStation: bindActionCreators(CreatorsStation, dispatch),
    };
};
export default connect(
    mapStateProps,
    mapDispatchToProps,
)(Home);
