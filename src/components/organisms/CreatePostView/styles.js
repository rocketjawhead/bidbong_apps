import {Color, METRICS, FONTS} from 'utils';

const styles = {
  background: {
    backgroundColor: Color.WhiteLilac,
    flex: 1,
  },
  container: {
    main: {
      padding: METRICS.gutter.s,
    },
  },
  card: {
    backgroundColor: Color.White,
    borderRadius: 10,
    padding: METRICS.gutter.s,
    marginTop: METRICS.gutter.xs,
  },
  content: {
    doorType: {
      flexDirection: 'row',
      marginTop: METRICS.gutter.xs,
    },
    image: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  },
  sectionInputDate: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  button: {
    save: {},
    doorTypeLeft: isActive => ({
      backgroundColor: isActive ? Color.CornflowerBlue15 : Color.Shades,
      padding: METRICS.gutter.s,
      borderRadius: 5,
      flex: 1,
      marginRight: 3,
    }),
    doorTypeRight: isActive => ({
      backgroundColor: isActive ? Color.CornflowerBlue15 : Color.Shades,
      padding: METRICS.gutter.s,
      borderRadius: 5,
      flex: 1,
      marginLeft: 3,
    }),
    chooseImage: {
      width: 70,
      height: 70,
      borderRadius: 10,
      backgroundColor: Color.CornflowerBlue15,
      justifyContent: 'center',
      marginVertical: METRICS.gutter.s,
    },
    date: {
      marginRight: METRICS.gutter.xxs,
      flex: 1,
    },
  },
  text: {
    title: {
      marginTop: METRICS.gutter.xs,
    },
    btnTitle: isActive => ({
      textAlign: 'center',
      color: isActive ? Color.CornflowerBlue100 : Color.Manatee100,
    }),
    photo: {
      textAlign: 'center',
      color: Color.CornflowerBlue100,
    },
  },
  input: {
    container: {
      marginTop: METRICS.gutter.xxl,
    },
    label: {
      color: Color.Manatee100,
    },
  },
  icon: {
    dropdown: {
      color: Color.CornflowerBlue100,
      fontSize: FONTS.size.L,
    },
  },
};

export default styles;
