import { useSelector } from "react-redux"

const NumberValue = () => {

  const globalNumber = useSelector(state => state.counter.value);

  return (
    <div>
      {globalNumber}
    </div>
  )
}

export default NumberValue
