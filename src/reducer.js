import CartContainer from "./CartContainer"

const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export const reducer = (state, action) => {
  let tempCart = []
  switch (action.type) {
    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      }

    case "REMOVE_ITEM":
      return {
        ...state,
        cart: action.payload,
      }

    // case "INCREASE":
    //   tempCart = state.cart.map((cartItem) => {
    //     if (cartItem.id === action.payload) {
    //       return { ...cartItem, amount: cartItem.amount + 1 }
    //     }
    //     return cartItem
    //   })
    //   return {
    //     ...state,
    //     cart: tempCart,
    //   }

    // case "DECREASE":
    //   tempCart = state.cart
    //     .map((cartItem) => {
    //       if (cartItem.id === action.payload) {
    //         return { ...cartItem, amount: cartItem.amount - 1 }
    //       }
    //       return cartItem
    //     })
    //     .filter((cartItem) => cartItem.amount !== 0)
    //   return {
    //     ...state,
    //     cart: tempCart,
    //   }

    case "TOGGLE_AMOUNT":
      tempCart = state.cart
        .map((cartItem) => {
          if (cartItem.id === action.payload.id) {
            if (action.payload.toggleType === "increase") {
              return { ...cartItem, amount: cartItem.amount + 1 }
            } else if (action.payload.toggleType === "decrease") {
              return { ...cartItem, amount: cartItem.amount - 1 }
            }
          }
          return cartItem
        })
        .filter((cartItem) => cartItem.amount !== 0)
      return { ...state, cart: tempCart }

    case "GET_TOTAL":
      let { total, amount } = state.cart.reduce(
        (cartTotal, cartItem) => {
          const { price, amount } = cartItem
          const itemTotal = price * amount
          cartTotal.total += itemTotal
          cartTotal.amount += amount
          return cartTotal
        },
        {
          total: 0,
          amount: 0,
        }
      )
      return { ...state, total: formatter.format(total), amount }
    case "LOADING":
      return { ...state, loading: true }
    case "DISPLAY_ITEMS":
      return { ...state, loading: false, cart: action.payload }
    default:
      throw new Error("No matching action type.")
  }
}
