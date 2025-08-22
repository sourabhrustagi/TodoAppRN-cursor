import { AppRegistry } from 'react-native';
import App from './App';

AppRegistry.registerComponent('TodoApp', () => App);
AppRegistry.runApplication('TodoApp', {
  rootTag: document.getElementById('root'),
});
