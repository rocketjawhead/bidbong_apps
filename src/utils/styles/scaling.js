import { PixelRatio } from 'libraries';
import { METRICS } from './metrics';

const { width, height } = METRICS.window;

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 667;

export const scale = size =>
  PixelRatio.roundToNearestPixel((width / guidelineBaseWidth) * size);
export const verticalScale = size => (height / guidelineBaseHeight) * size;
export const moderateScale = (size, factor = 0.5) =>
  PixelRatio.roundToNearestPixel(size + (scale(size) - size) * factor);
