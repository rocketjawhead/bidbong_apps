/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/destructuring-assignment */
import { React, View, Component, ScrollView } from 'libraries';
import {
  Image,
  OnboardingItem,
  OnboardingHeader,
  OnboardingContent,
} from 'components';
import { METRICS, func } from 'utils';
import { CommonActions, StackActions } from '@react-navigation/native';
import { Fragment } from 'react';
import styles from './styles';
import dataDummy from './dataDummy';

/**
 * @name Onboarding Pages for onboarding
 * @description Used in Product I JOIN
 */

class Onboarding extends Component {
  state = {
    webview: {
      content: '',
    },
    activeIndex: 0,
    modalVisible: {
      modalWebView: false,
    },
  };

  /**
   * handling ScrollView onScroll event
   */
  onScroll = e => {
    this.OnboardingContent.onScroll(e);
    this.OnboardingHeader.onScroll(e);
  };

  /**
   * handling ScrollView onMomentumScrollEnd event
   */
  onMomentumScrollEnd = e => {
    let activeIndex = 0;
    const screenPosition = Math.round(e.nativeEvent.contentOffset.x);

    while (
      activeIndex * Math.round(METRICS.window.width) <
      screenPosition - 5
    ) {
      activeIndex += 1;
    }
    return this.setState({ activeIndex });
  };

  /**
   * handling event when user want to go to next onboarding phase
   */
  onPressSlideNext = () => {
    const { activeIndex } = { ...this.state };
    const newActivaIndex = activeIndex + 1;

    this.setState({ activeIndex: newActivaIndex }, () => {
      this.ScrollView.scrollTo({
        x: newActivaIndex * Math.round(METRICS.window.width),
        y: 0,
        animated: true,
      });
    });
  };

  /**
   * handling event when user want to go to skip onboarding phase
   */
  onPressSlideSkip = () => {
    const onboarding = dataDummy;
    const newActivaIndex = onboarding.length - 1;

    this.setState({ activeIndex: newActivaIndex }, () => {
      this.ScrollView.scrollTo({
        x: newActivaIndex * Math.round(METRICS.window.width),
        y: 0,
        animated: true,
      });
    });
  };

  /**
   * HANDLING NAVIGATE TO LOGIN PAGE
   */
  onPressToLogin = () => {
    const { navigation } = this.props;
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'LOGIN' }],
      }),
    );
  };

  render() {
    const { activeIndex } = this.state;
    const {
      onScroll,
      onPressSlideSkip,
      onPressToLogin,
      onMomentumScrollEnd,
    } = this;

    const isLastIndex = activeIndex === dataDummy.length - 1;
    const isOnboardingEnabled = true;

    // Avoid logic on screen, this condition for loding if hasn't onboarding
    if (dataDummy.length <= 0 || dataDummy.length <= 0) {
      return (
        <View style={styles.loading.container}>
          <Image source="loading" style={styles.loading.image} />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        {/* Layer 1 */}

        {/* Layer 2 */}
        <ScrollView
          ref={c => {
            this.ScrollView = c;
          }}
          bounces={false}
          onScroll={onScroll}
          horizontal
          pagingEnabled
          scrollEventThrottle={16}
          onMomentumScrollEnd={onMomentumScrollEnd}
          showsHorizontalScrollIndicator={false}>
          {dataDummy.map((data, i) => (
            <Fragment>
              <OnboardingItem key={i} index={i} backgroundImage={data.image} />
            </Fragment>
          ))}
        </ScrollView>

        {/* Layer 3 */}
        <OnboardingContent
          ref={c => {
            this.OnboardingContent = c;
          }}
          onboarding={dataDummy}
          isLastIndex={isLastIndex}
          isOnboardingEnabled={isOnboardingEnabled}
        />
        <OnboardingHeader
          ref={c => {
            this.OnboardingHeader = c;
          }}
          onboarding={dataDummy}
          activeIndex={activeIndex}
          onPressToLogin={onPressToLogin}
          onPressSlideSkip={onPressSlideSkip}
        />
      </View>
    );
  }
}

export default Onboarding;
