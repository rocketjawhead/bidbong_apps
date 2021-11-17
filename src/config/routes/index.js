/* eslint-disable import/no-unresolved */
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { React } from 'libraries';
import {
  BidRoom,
  Cart,
  Checkout,
  CheckoutKey,
  CreatePost,
  CreateUser,
  Dashboard,
  DetailBidRoom,
  EditProfile,
  EditProfileAdmin,
  ForgotPassword,
  ListAdminAccount,
  Loading,
  Login,
  MainMenu,
  ManageKey,
  ManageShipping,
  Notification,
  Onboarding,
  OTP,
  Payment,
  Reservation,
  ResetPassword,
  SignUp,
  SplashScreen,
  StatusBid,
  TotalBidder,
  TotalRoom,
} from 'pages';

/**
 * ===================================================================================================
 * ROOT NAVIGATION
 * ===================================================================================================
 */

const navigationRef = React.createRef();

export function AppRouteNavigate(name, params = {}) {
  return navigationRef.current?.navigate(name, params);
}

export function AppRouteReset(payload) {
  return navigationRef.current?.dispatch(CommonActions.reset(payload));
}

const Stack = createStackNavigator();

const AppRoute = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="SPLASHSCREEN"
      // initialRouteName="RESETPASSWORD"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OTP" component={OTP} />
      <Stack.Screen name="CART" component={Cart} />
      <Stack.Screen name="LOGIN" component={Login} />
      <Stack.Screen name="SIGNUP" component={SignUp} />
      <Stack.Screen name="PAYMENT" component={Payment} />
      <Stack.Screen name="LOADING" component={Loading} />
      <Stack.Screen name="BIDROOM" component={BidRoom} />
      <Stack.Screen
        name="CHECKOUT"
        component={Checkout}
        initialParams={{ data: {} }}
      />
      <Stack.Screen name="MAINMENU" component={MainMenu} />
      <Stack.Screen
        name="STATUSBID"
        component={StatusBid}
        initialParams={{ data: {} }}
      />
      <Stack.Screen name="MANAGEKEY" component={ManageKey} />
      <Stack.Screen name="DASHBOARD" component={Dashboard} />
      <Stack.Screen name="TOTALROOM" component={TotalRoom} />
      <Stack.Screen name="CREATEUSER" component={CreateUser} />
      <Stack.Screen name="ONBOARDING" component={Onboarding} />
      <Stack.Screen
        name="CREATEPOST"
        component={CreatePost}
        initialParams={{ data: {} }}
      />
      <Stack.Screen name="CHECKOUTKEY" component={CheckoutKey} />
      <Stack.Screen name="EDITPROFILE" component={EditProfile} />
      <Stack.Screen name="TOTALBIDDER" component={TotalBidder} />
      <Stack.Screen name="RESERVATION" component={Reservation} />
      <Stack.Screen name="NOTIFICATION" component={Notification} />
      <Stack.Screen
        name="SPLASHSCREEN"
        component={SplashScreen}
        initialParams={{ data: {}, token: '' }}
      />
      <Stack.Screen name="RESETPASSWORD" component={ResetPassword} />
      <Stack.Screen name="DETAILBIDROOM" component={DetailBidRoom} />
      <Stack.Screen name="FORGOTPASSWORD" component={ForgotPassword} />
      <Stack.Screen name="MANAGESHIPPING" component={ManageShipping} />
      <Stack.Screen name="LISTADMINACCOUNT" component={ListAdminAccount} />
      <Stack.Screen
        name="EDITPROFILEADMIN"
        component={EditProfileAdmin}
        initialParams={{ data: {} }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppRoute;
