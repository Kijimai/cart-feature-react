import React, { useState, useContext, useReducer, useEffect } from "react"
import cartItems from "./data"
import { reducer } from "./reducer"
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-useReducer-cart-project"
const AppContext = React.createContext()

const initialState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0,
}

const ACTIONS = {
  CLEAR_CART: "CLEAR_CART",
  REMOVE_ITEM: "REMOVE_ITEM",
  INCREASE: "INCREASE",
  DECREASE: "DECREASE",
  GET_TOTAL: "GET_TOTAL",
  LOADING: "LOADING",
  DISPLAY_ITEMS: "DISPLAY_ITEMS",
  TOGGLE_AMOUNT: "TOGGLE_AMOUNT",
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const fetchData = async () => {
    dispatch({ type: ACTIONS.LOADING })
    const response = await fetch(url)
    const cart = await response.json()
    dispatch({ type: ACTIONS.DISPLAY_ITEMS, payload: cart })
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    dispatch({ type: ACTIONS.GET_TOTAL })
  }, [state.cart])

  const clearCart = () => {
    dispatch({ type: ACTIONS.CLEAR_CART })
  }

  const increaseAmount = (id) => {
    dispatch({ type: ACTIONS.INCREASE, payload: id })
  }

  const decreaseAmount = (id) => {
    dispatch({ type: ACTIONS.DECREASE, payload: id })
  }

  const removeItem = (id) => {
    const filteredItems = state.cart.filter((item) => item.id !== id)
    dispatch({ type: ACTIONS.REMOVE_ITEM, payload: filteredItems })
  }

  const toggleAmount = (id, toggleType) => {
    dispatch({
      type: ACTIONS.TOGGLE_AMOUNT,
      payload: { id, toggleType },
    })
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        increaseAmount,
        decreaseAmount,
        toggleAmount,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
