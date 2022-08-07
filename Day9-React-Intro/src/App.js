import { useState } from 'react';
import './App.css';

function App() {

  const [num1, setNum1] = useState(2);

  const [err, setErr] = useState()

  const [num2, setNum2] = useState(4);

  const [result, setResult] = useState(0)

  return (
    <div>
      <h2>Simple caculator</h2>
      <div>
        {err && <h2 className='error'>{err}</h2>}
        <label htmlFor="num1">Num one</label>
        <input
          name="num1"
          id="num1"
          type="number"
          value={num1}
          onChange={(e) => {
            setNum1(parseInt(e.target.value));
          }}
        />
      </div>

      <div>
        <label htmlFor="num2">Num Two</label>
        <input
          name="num2"
          id="num2"
          type="number"
          value={num2}
          onChange={(e) => {
            setNum2(parseInt(e.target.value));
          }}
        />
      </div>
      <button
        onClick={() => {
          setResult(num1 + num2);
        }}
      >
        Add
      </button>
      <button
        onClick={() => {
          setResult(num1 - num2);
        }}
      >
        Sub
      </button>
      <button
        onClick={() => {
          setResult(num1 * num2);
        }}
      >
        Mul
      </button>

      <div>Ans: {result}</div>

      <h1>SUM: {num1 + num2}</h1>
      <h1>SUB: {num1 - num2}</h1>
      <h1>MUL: {num1 * num2}</h1>
    </div>
  );
}

export default App;
