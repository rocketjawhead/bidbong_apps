import { Image, Text } from 'components/atoms';
import { getProfile, setToken } from 'config';
import CONST from 'config/const';
import { PropTypes, React } from 'libraries';
import { connect } from 'react-redux';
import { func } from 'utils';
import styles from './styles';

class SplashScreen extends React.Component {
  componentDidMount() {
    const { getSession } = this;
    getSession();
  }

  getSession = async () => {
    const { navigation, reqGetProfile } = this.props;
    const { handlerSetToken } = this;
    const data = await func.getProfileFromLocalStorage();
    try {
      await handlerSetToken();
      await reqGetProfile();
      if (data) {
        if (data.roleId === 5)
          return navigation.reset({
            index: 0,
            routes: [{ name: 'MAINMENU' }],
          });
        return navigation.reset({
          index: 0,
          routes: [{ name: 'DASHBOARD' }],
        });
      }
    } catch {
      func.clearAllDataFromLocalStorage();
      return navigation.reset({
        index: 0,
        routes: [{ name: 'ONBOARDING' }],
      });
    }
  };

  handlerSetToken = async () => {
    const { reqSetToken } = this.props;
    try {
      const data = await func.getProfileFromLocalStorage();
      reqSetToken(data.token);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <Image
        source="img-splash-screen"
        imageBackground
        imgWidth={100}
        style={styles.container}>
        <Text translate={false}>{CONST.appVersion}</Text>
      </Image>
    );
  }
}

SplashScreen.defaultProps = {
  reqSetToken: () => {},
  reqGetProfile: () => {},
};

SplashScreen.propTypes = {
  reqSetToken: PropTypes.func,
  reqGetProfile: PropTypes.func,
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  reqSetToken: p => dispatch(setToken(p)),
  reqGetProfile: () => dispatch(getProfile()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SplashScreen);
