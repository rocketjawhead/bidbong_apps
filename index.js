/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native';
import App from './src/containers/App';
import { name as appName } from './app.json';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); // Ignore all log notifications

import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));

AppRegistry.registerComponent(appName, () => App);
