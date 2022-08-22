import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const ITEM_WIDTH = 0.68 * width;
export const ITEM_HEIGHT = ITEM_WIDTH * 1.5;
export const RADIUS = 18;
export const SPACING = 12;
export const FULL_SIZE = ITEM_WIDTH + SPACING * 2;
