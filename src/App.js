//import {UseState} from './UseState.js';
import { UseReducer } from './UseReducer.js';
import {ClassState} from './ClassState.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <UseReducer name="UseReducer"/>
      <ClassState name="CalssState"/>
    </div>
  );
}

export default App;
