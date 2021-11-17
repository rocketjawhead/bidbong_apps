import {React, View, PropTypes} from 'libraries';
// eslint-disable-next-line import/no-cycle
import {Text} from 'components/atoms';
import styles from './styles';

const _renderTitle = (type, theme, title, titleBold, titleStyle) => {
  if (!title) return null;
  return (
    <Text bold={titleBold} style={[styles.title(theme, type), titleStyle]}>
      {title}
    </Text>
  );
};

const Price = ({
  type,
  theme,
  amount,
  title,
  titleBold,
  titleStyle,
  containerStyles,
}) => (
  <View style={containerStyles}>
    {_renderTitle(type, theme, title, titleBold, titleStyle)}
    <View style={styles.container}>
      <Text translate={false} bold style={styles.text(theme, type)}>
        {`${amount}€`}
      </Text>
    </View>
  </View>
);
Price.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  theme: PropTypes.string,
  amount: PropTypes.number,
  titleBold: PropTypes.bool,
  titleStyle: PropTypes.object,
  containerStyles: PropTypes.object,
};

Price.defaultProps = {
  type: 'sm',
  title: '',
  theme: 'light',
  amount: 0,
  titleBold: false,
  titleStyle: {},
  containerStyles: {},
};

export default Price;
