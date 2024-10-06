// import logo from './logo.svg';
// import './App.css';
import RoutingModule from "./RoutingModule";
import { Provider } from 'react-redux';
import appStore from './utils/Store/AppStore'
function App() {
  return (
    <Provider store={appStore}>
      <RoutingModule/>
    </Provider>
  );
}

export default App;
