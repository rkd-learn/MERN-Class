import { useDispatch, useSelector } from 'react-redux';
import { decreaseBy, decrement, increaseBy, increment } from './redux/actions/counter';

import NumberValue from './NumberValue';

const NumberCounter = () => {
  const globalNumber = useSelector(state => state.counter.value);

  const dispatch = useDispatch();

  return (
    <div className="App">
      <h1>Increment/Decrement</h1>
      <div className="counter">
        <button
          onClick={() => dispatch(decrement())}
        >-</button>
        <button
          onClick={() => dispatch(decreaseBy(2))}
        >Dec by 2</button>
        <h1 className="counter-value">{globalNumber}</h1>
        <button
          onClick={() => dispatch(increment())}
        >+</button>
        <button
          onClick={() => dispatch(increaseBy(5))}
        >increase by 5</button>
      </div>
      <hr />

      <h1>Diffrent component</h1>
      <NumberValue />
    </div>
  )
}

export default NumberCounter
