import React, { useReducer } from "react";
import { Type } from "./Action.type";
// const [state, dispatcher] = useReducer(reducer, initialState);

export const initialState = {

  basket: [], //emplty array to collect items
  user: null, //user object
};

export const reducer = (state, action) => {
  switch (action.type) {
    case Type.ADD_TO_BASKET:
      // return {
      //   ...state,
      //   basket: [...state.basket, action.item], //....state-means it keeps the whole page in the state and updates the basket and put it in action.item in the basket, them the item will be added to the empty basket[]
      // };

      // check if the item eists
      const existingItem = state.basket.find(
        (item) => item.id === action.item.id
      );
      // if the item exists, increment the quantity
      if (!existingItem) {
        return {
          ...state,
          basket: [...state.basket, { ...action.item, amount: 1 }],
        };
      } else {
        const updatedBasket = state.basket.map((item) => {
          return item.id === action.item.id
            ? { ...item, amount: item.amount + 1 }
            : item;
        });
        return {
          ...state,
          basket: updatedBasket, //replace with the updated basket.
        };
      }
    case Type.REMOVE_FROM_BASKET:
      return {
        ...state,
        basket: state.basket
          .map((item) =>
            item.id === action.id ? { ...item, amount: item.amount - 1 } : item
          )
          .filter((item) => item.amount > 0),
        // Filter out items with amount .0 and Remove item if amount becomes 0,
      };

    case Type.SET_USER:
      return {
        ...state,
        user: action.user,
      };
      
        case Type.SET_USER:
          return{...state, user:action.user}
    default:
      return state;
  }
};

