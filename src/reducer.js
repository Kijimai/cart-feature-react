export const reducer = (state, action) => {
  switch (action.type) {
    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      }
    case "REMOVE_ITEM":
      return {
        ...state,
        cart: action.payload
      }
    default:
      return state
  }
}
