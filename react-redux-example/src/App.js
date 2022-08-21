import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from './actions';

import './App.css';


function App() {

  const globalNumber = useSelector(state => state.updateNumber);

  const dispatch = useDispatch();
  return (
    <div className="App">
      <h1>Increment/Decrement</h1>

      <div className="counter">
        <button onClick={() => dispatch(decrement())} >-</button>
        <h1 className="counter-value">{globalNumber}</h1>
        <button onClick={() => dispatch(increment())}>+</button>
      </div>
    </div>
  );
}

export default App;
