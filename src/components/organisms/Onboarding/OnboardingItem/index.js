import {React, View, PropTypes, Image} from 'libraries';
import {Color} from 'utils';
import styles from './styles';

class OnboardingItem extends React.PureComponent {
  static propTypes = {
    index: PropTypes.number,
    backgroundImage: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  };

  static defaultProps = {
    backgroundImage: 'https://placeimg.com/400/400/tech',
  };

  render() {
    const {backgroundImage} = this.props;
    return (
      <View style={{height: '100%'}}>
        <Image
          resizeMode="stretch"
          source={{
            uri: backgroundImage,
          }}
          style={styles.backgroundImage}
        />
      </View>
    );
  }
}

export default OnboardingItem;
