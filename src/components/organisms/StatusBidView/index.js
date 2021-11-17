import {React, View, PropTypes} from 'libraries';
import {Text, Image, Price, Button} from 'components';
import styles from './styles';

class StatusBidView extends React.PureComponent {
  _renderContent = isWinner => {
    const {productName} = this.props;
    if (isWinner)
      return (
        <View style={styles.wrapper.winner}>
          <Image
            source="img-bg-winner"
            resizeMode="cover"
            style={styles.bgImage}
            imgWidth={styles.imgWidth}
          />
          <View style={styles.content.main}>
            <Image
              source="img-default-profile"
              imgWidth={90}
              style={styles.imgProfle}
            />
            <Text h2 style={styles.text.congratulation}>
              statusBid.success.title
            </Text>
            <Text bold style={styles.text.won}>
              statusBid.success.subtitle
            </Text>
            <Text style={styles.text.product} translate={false}>
              {productName}
            </Text>
          </View>
        </View>
      );

    return (
      <View style={styles.wrapper.winner}>
        <Image
          source="img-bg-lose"
          resizeMode="cover"
          style={styles.bgImage}
          imgWidth={styles.imgWidth}
        />
        <View style={styles.content.main}>
          <Text h2 style={styles.text.congratulation}>
            statusBid.failed.title
          </Text>
          <Text bold style={styles.text.won}>
            statusBid.failed.subtitle
          </Text>
          <Text style={styles.text.product} translate={false}>
            {productName}
          </Text>
        </View>
      </View>
    );
  };

  _renderTxtFooter = isWinner => {
    if (isWinner)
      return (
        <Text style={styles.text.footer}>statusBid.success.text.desc</Text>
      );

    return <Text style={styles.text.footer}>statusBid.failed.text.desc</Text>;
  };

  render() {
    const {isWinner, winnerPrice, onPress} = this.props;
    const {_renderContent, _renderTxtFooter} = this;
    const titleButton = isWinner
      ? 'statusBid.success.button'
      : 'statusBid.failed.button';
    return (
      <View style={styles.container.main}>
        <Text style={styles.text.title}>statusBid.title</Text>
        {_renderContent(isWinner)}
        <Price
          title="component.higherBid"
          type="md"
          theme="green"
          containerStyles={styles.price}
          amount={winnerPrice}
          titleStyle={styles.text.titlePrice}
        />
        {_renderTxtFooter(isWinner)}
        <View style={styles.container.button}>
          <Button
            title={titleButton}
            containerStyles={styles.button}
            onPress={onPress}
          />
        </View>
      </View>
    );
  }
}

StatusBidView.defaultProps = {
  isWinner: false,
  productName: '',
  winnerPrice: 0,
  onPress: () => {},
};

StatusBidView.propTypes = {
  isWinner: PropTypes.bool,
  onPress: PropTypes.func,
  productName: PropTypes.string,
  winnerPrice: PropTypes.number,
};

export default StatusBidView;
