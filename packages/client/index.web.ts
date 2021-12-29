import { AppRegistry } from 'react-native';
import appName from './app.json';
import App from './src/App';

AppRegistry.registerComponent(
  appName.name,
  () => App
);

AppRegistry.runApplication(
  appName.name,
  {
    initialProps: {},
    rootTag: document.getElementById('app-root'),
    mode: 'Concurrent',
  }
);
