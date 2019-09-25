import styled from 'styled-components/native';

import { metrics, colors } from '../../styles';

const { heightWindow, screenHeight } = metrics;

export const topToClose = screenHeight / 5;
export const topToOpen = screenHeight / 10;
export const dimensionsToOpen = heightWindow / 1.2;
export const dimensionsToClose = heightWindow / 11;

export const Container = styled.View.attrs(() => ({
    elevation: 6,
}))`
    position: absolute;
    left: ${screenHeight / 15};
    right: ${screenHeight / 15};
    border-radius: 5;
    background-color: #e5e5e5;
    opacity: 0.9;
`;

export const ContainerInput = styled.View`
    color: #374049;
`;
export const SearchItem = styled.TextInput`
    font-family: 'SegoeUI';
    font-size: 24;
    font-style: normal;
    color: #374049;
`;

export const ScrollItem = styled.ScrollView`
    flex: 1;
`;

export const BairrosContainer = styled.TouchableOpacity.attrs(() => ({
    elevation: 6,
}))`
    justify-content: center;
    flex: 1;
    height: ${dimensionsToOpen / 3 - 15};
    margin: 18px 2.5px 0px 2.5px;
    background-color: red;
    border-radius: 5;
    background-color: #ffffff;
`;

export const BairrosItem = styled.Text.attrs(() => ({
    textShadowOffset: {
        width: 0,
        height: 2,
    },
    textShadowRadius: 6,
}))`
    flex: 1;
    font-family: 'SegoeUI';
    font-size: 28;
    font-weight: normal;
    font-style: normal;
    line-height: 30;
    letter-spacing: 0;
    text-align: left;
    color: #374049;
`;
