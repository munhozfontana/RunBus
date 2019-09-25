import * as React from 'react';
import { Animated, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import Creators from '../../store/ducks/lines';
import { Utils } from '../../utils';
import {
    BairrosContainer,
    BairrosItem,
    Container,
    ContainerInput,
    dimensionsToClose,
    dimensionsToOpen,
    ScrollItem,
    SearchItem,
    topToClose,
    topToOpen,
} from './styles';

interface BairroModel {
    bairro: string;
    cod: string;
}

const Bairros = [
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
];

const InputSearch: React.FunctionComponent = ({ loadRequestLinesNumber, loadRequestLinesReference }) => {
    const [input, setInput] = React.useState<string>('');
    const [bairros, setBairros] = React.useState<BairroModel[]>([]);

    const [animations, setAnimations] = React.useState({
        strechHeight: new Animated.Value(dimensionsToClose),
        strechTop: new Animated.Value(dimensionsToClose),
    });

    const filterBairros = (text: string) => {
        const value = Utils.removerAcentos(text.toLowerCase());
        const bairrosFilter = Bairros.filter(elem => {
            const bairroFilter = Utils.removerAcentos(elem.bairro.toLowerCase());
            return bairroFilter.includes(value) && elem;
        });

        setBairros(bairrosFilter);
        if (bairros.length !== 0) {
            animatedStrech(dimensionsToOpen, topToOpen).start();
        }
    };

    const animatedStrech = (height: any, top: number) => {
        return Animated.parallel([
            Animated.timing(animations.strechHeight, {
                duration: 500,
                toValue: height,
            }),
            Animated.timing(animations.strechTop, {
                duration: 500,
                toValue: top,
            }),
        ]);
    };

    const resetSearch = () => {
        setBairros([]);
        animatedStrech(dimensionsToClose, topToClose).start();
    };

    const findBuses = () => {};

    React.useEffect(() => {
        if (input.length !== 0) {
            filterBairros(input);
        } else {
            resetSearch();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [input]);

    return (
        <Container
            style={{
                top: animations.strechTop,
                height: animations.strechHeight,
            }}
            as={Animated.View}
        >
            <ContainerInput>
                <SearchItem
                    onSubmitEditing={Keyboard.dismiss}
                    value={input}
                    onChangeText={(text: string) => setInput(text)}
                    autoCapitalize="none"
                ></SearchItem>
            </ContainerInput>

            <ScrollItem>
                {bairros.map(item => (
                    <BairrosContainer key={item.cod}>
                        <BairrosItem onPress={findBuses}>{item.bairro}</BairrosItem>
                    </BairrosContainer>
                ))}
            </ScrollItem>
        </Container>
    );
};

const mapStateProps = ({ lines }) => lines;

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(Creators, dispatch);

export default connect(
    mapStateProps,
    mapDispatchToProps,
)(InputSearch);
