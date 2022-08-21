export const increment = (payload) => {
  return {
    type: 'INCREMENT',
    payload
  }
}

export const decrement = () => {
  return {
    type: 'DECREMENT'
  }
}

export const incrementBy = (payload) => {
  return {
    type: 'INCREMENT_BY',
    payload
  }
}

export const decrementBy = (payload) => {
  return {
    type: 'DECREMENT_BY',
    payload
  }
}
