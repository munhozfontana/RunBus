import { createActions, createReducer } from 'reduxsauce';
import SeamlessImmutable from 'seamless-immutable';

// Action Types & Creators
const { Types, Creators } = createActions({
    loadRequestUtils: null,
});

export const UtilsTypes = Types;
export default Creators;

// Initial State
export const INITIAL_STATE = SeamlessImmutable({
    data: [
        { bairro: 'Águas Claras', cod: '12' },
        { bairro: 'Asa Norte', cod: '24' },
        { bairro: 'Asa Sul', cod: '26' },
        { bairro: 'Brazlândia', cod: '1' },
        { bairro: 'Candangolândia', cod: '20' },
        { bairro: 'Ceilândia', cod: '14' },
        { bairro: 'Cidade Estrutural', cod: '11' },
        { bairro: 'Cruzeiro', cod: '22' },
        { bairro: 'Gama', cod: '10' },
        { bairro: 'Guará', cod: '21' },
        { bairro: 'Itapoã', cod: '6' },
        { bairro: 'Jardim Botânico', cod: '30' },
        { bairro: 'Lago Norte', cod: '5' },
        { bairro: 'Lago Sul', cod: '8' },
        { bairro: 'Noroeste', cod: '32' },
        { bairro: 'Nucleo Bandeirante', cod: '19' },
        { bairro: 'Paranoa', cod: '7' },
        { bairro: 'Park Way', cod: '27' },
        { bairro: 'Planaltina', cod: '2' },
        { bairro: 'Plano Piloto', cod: '25' },
        { bairro: 'Recanto das Emas', cod: '16' },
        { bairro: 'Riacho Fundo I', cod: '18' },
        { bairro: 'Riacho Fundo II', cod: '17' },
        { bairro: 'Samambaia', cod: '15' },
        { bairro: 'Santa Maria', cod: '9' },
        { bairro: 'São Sebastião', cod: '29' },
        { bairro: 'Sobradinho', cod: '4' },
        { bairro: 'Sobradinho II', cod: '3' },
        { bairro: 'Sudoeste', cod: '31' },
        { bairro: 'Taguatinga', cod: '13' },
        { bairro: 'Vicente Pires', cod: '28' },
    ],
});

// Reducer
export const reducer = createReducer(INITIAL_STATE, {
    [Types.LOAD_REQUEST_UTILS]: state => state,
});

export interface DispatchUtils {
    loadRequestUtils: Function;
}

export interface StateUtils {
    bairros: BairroModel[];
}

export interface BairroModel {
    bairro: string;
    cod: string;
}
