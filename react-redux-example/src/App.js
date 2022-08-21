import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement, decrementBy, incrementBy } from './actions';

import './App.css';


function App() {

  // global state data 
  const globalNumber = useSelector(state => state.globalNumber);

  const dispatch = useDispatch();



  return (
    <div className="App">
      <h1>Increment/Decrement</h1>

      <div className="counter">
        <button onClick={() => dispatch(decrement())} >-</button>
        <button onClick={() => dispatch(decrementBy(2))} >Dec by 2</button>
        <h1 className="counter-value">{globalNumber}</h1>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(incrementBy(5))}>increase by 5</button>
      </div>
    </div>
  );
}

export default App;
