const initialState = 10;
export const globalNumber = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    case 'INCREMENT_BY':
      return state + action.payload;
    case 'DECREMENT_BY':
      return state - action.payload;
    default:
      return initialState;
  }
}
