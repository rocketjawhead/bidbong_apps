/**
 * @name Color Base colors for the app
 * @description Don't use this when building components, use Theme instead!
 */
export const Color = {
  White: 'rgba(255, 255, 255, 1)', // '#FFFFFF'
  White50: 'rgba(255, 255, 255, 0.5)', // '#FFFFFF'
  White25: 'rgba(255, 255, 255, 0.25)', // '#FFFFFF'
  transparent: 'rgba(255, 255, 255, 0)',
  Black50: 'rgba(8, 18, 31, 0.7)',
  BaliHai: 'rgba(128, 142, 170, 1)', // #808EAA
  Shades: 'rgba(241,242,245, 1)', // #F1F2F5
  BlueRoyal100: 'rgba(70, 76, 224, 1)', // #464CE0,
  BlueRoyal75: 'rgba(70, 76, 224, 0.75)',
  BlueRoyal50: 'rgba(70, 76, 224, 0.50)',
  BlueRoyal25: 'rgba(70, 76, 224, 0.25)',
  CornflowerBlue100: 'rgba(104, 119, 244, 1)', // #6877F4
  CornflowerBlue75: 'rgba(104, 119, 244, 0.75)',
  CornflowerBlue50: 'rgba(104, 119, 244, 0.50)',
  CornflowerBlue25: 'rgba(104, 119, 244, 0.25)',
  CornflowerBlue15: 'rgba(104, 119, 244, 0.15)', // #6877F4
  EastBay100: 'rgba(57, 74, 109, 1)', // #394A6D
  EastBay75: 'rgba(57, 74, 109, 0.75)',
  EastBay50: 'rgba(57, 74, 109, 0.50)',
  EastBay25: 'rgba(57, 74, 109, 0.25)',
  Manatee100: 'rgba(136, 142, 158, 1)', // #888E9E
  Manatee75: 'rgba(136, 142, 158, 0.75)',
  Manatee50: 'rgba(136, 142, 158, 0.50)',
  Manatee25: 'rgba(136, 142, 158, 0.25)',
  DeYork: 'rgba(110, 202, 158, 1)', // #6ECA9E,
  DeYork15: 'rgba(110, 202, 158, 0.15)', // #6ECA9E,
  BlueSea: 'rgba(87, 170, 246, 1)', // #57AAF6
  BlueSea15: 'rgba(87, 170, 246, 0.15)',
  Froly: 'rgba(244, 104, 129, 1)', // #F46881
  Froly50: 'rgba(244, 104, 129, 0.5)', // #F46881
  Froly15: 'rgba(244, 104, 129, 0.15)', // #F46881
  Riptide: 'rgba(126, 237, 197, 1)', // #7EEDC5,
  Malibu: 'rgba(98, 227, 255, 1)', // #62E3FF
  GoldenTainoi: 'rgba(255, 210, 99, 1)', // #FFD263
  Canary: 'rgba(205, 255, 99, 1)', // #CDFF63,
  Selago: 'rgba(231, 233, 253, 1)', // #E7E9FD
  PinkLady: 'rgba(255, 241, 214, 1)', // #FFF1D6
  AthensGray: 'rgba(249, 250, 251, 1)', // #F9FAFB
  Lynch: 'rgba(104, 119, 156, 1)', // #68779C
  WhiteLilac: 'rgba(240, 241, 250, 1)', // #F0F1FA
};

/**
 * @name Theme Thematic colors for the app
 * @description Use this variables for implementations
 * @note This naming does not reflect props naming. e.g. button secondary doesnt necessarily use color secondary
 */

export const Theme = {
  red: Color.red,
  dark: Color.black,
  light: Color.white,
  primary: x => {
    switch (x) {
      case '125':
        return Color.skyBlue125;
      case '75':
        return Color.skyBlue75;
      case '50':
        return Color.skyBlue50;
      default:
        return Color.skyBlue100;
    }
  },
  secondary: {
    orange: x => {
      switch (x) {
        case '125':
          return Color.freshOrange125;
        case '75':
          return Color.freshOrange75;
        case '50':
          return Color.freshOrange50;
        default:
          return Color.freshOrange100;
      }
    },
    limeGreen: x => {
      switch (x) {
        case '125':
          return Color.limeGreen125;
        case '75':
          return Color.limeGreen75;
        case '50':
          return Color.limeGreen50;
        default:
          return Color.limeGreen100;
      }
    },
    forestGreen: x => {
      switch (x) {
        case '125':
          return Color.forestGreen125;
        case '75':
          return Color.forestGreen75;
        case '50':
          return Color.forestGreen50;
        default:
          return Color.forestGreen100;
      }
    },
    yellow: x => {
      switch (x) {
        case '125':
          return Color.sunnyYellow125;
        case '75':
          return Color.sunnyYellow75;
        case '50':
          return Color.sunnyYellow50;
        default:
          return Color.sunnyYellow100;
      }
    },
  },
  grey: x => {
    switch (x) {
      case '100':
        return Color.grey100;
      case '75':
        return Color.grey75;
      case '25':
        return Color.grey25;
      case '15':
        return Color.grey15;
      default:
        return Color.grey50;
    }
  },
  transparent: x => {
    switch (x) {
      case '25':
        return Color.transparent25;
      case '10':
        return Color.transparent10;
      default:
        return Color.transparent;
    }
  },
  darkTransparent: x => {
    switch (x) {
      case '75':
        return Color.darkTransparent75;
      default:
        return Color.darkTransparent25;
    }
  },
};

/**
 * @name ThemeButton
 * @description Thematic colors for buttons backgrounds and its text colors
 */

export const ThemeButton = {
  dark: Theme.dark,
  inactive: Theme.grey(),
  secondary: Theme.light,
  primary: Theme.primary(),
  transparent: Theme.transparent(),
  inactiveTransparent: Theme.grey(),
};

export const ThemeButtonText = {
  primary: Theme.light,
  secondary: Theme.dark,
  inactive: Theme.grey(),
  inactiveTransparent: Theme.grey(),
};

/**
 * @name ThemeFormLabel
 * @description Thematic colors for form elements
 */

export const ThemeFormLabel = {
  active: Theme.dark,
  default: Theme.grey('75'),
};
