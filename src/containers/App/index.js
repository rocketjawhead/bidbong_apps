import { store } from 'config';
import { React } from 'libraries';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import Application from './AppContainer';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Application />
      </Provider>
    );
  }
}
export default App;
