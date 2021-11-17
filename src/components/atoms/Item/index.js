import {React, View, Text, PropTypes, StyleSheet} from 'libraries';
import {Color} from 'utils';

const Item = ({opacity, selected, vertical, fontSize, name}) => (
  <View
    style={[
      styles.OptionWrapper,
      {
        opacity,
        borderColor: selected ? Color.Manatee50 : 'transparent',
        width: vertical ? 300 : 'auto',
      },
    ]}>
    <Text style={{fontSize, textAlign: 'center'}}>{name}</Text>
  </View>
);

const styles = StyleSheet.create({
  OptionWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 50,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderRadius: 10,
  },
});

Item.defaultProps = {
  opacity: 1,
  selected: 1,
  vertical: true,
  fontSize: 1,
  name: '',
};

Item.propTypes = {
  opacity: PropTypes.number,
  selected: PropTypes.number,
  vertical: PropTypes.bool,
  fontSize: PropTypes.number,
  name: PropTypes.string,
};

export default React.memo(Item);
