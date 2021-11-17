import {scale} from './scaling';

/**
 * @name Fonts
 */

export const FONTS = {
  type: {
    bold: 'Roboto-Bold',
    thin: 'Roboto-Thin',
    regular: 'Roboto-Regular',
    light: 'Roboto-Light',
  },
  size: {
    XXXS: scale(11), //11, // scale(11),
    XXS: scale(12), //12, // scale(12),
    XS: scale(13), //13, // scale(13),
    S: scale(14), //14, // scale(14),
    M: scale(16), //16, // scale(16),
    L: scale(18), //18, // scale(18),
    XL: scale(20), //20, // scale(20), // H3
    XXL: scale(24), //24, // scale(24), // H2
    XXXL: scale(28), // 28 // scale(28) // H1
  },
};
