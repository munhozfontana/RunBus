import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');

export default {
    widthWindow: width,
    heightWindow: height,
    heightPadding: height / 10,
    heightRadius: height / 10,
    widthPadding: width / 10,
    widthRadius: width / 10,
    screenWidth: width < height ? width : height,
    screenHeight: width < height ? height : width,
};
