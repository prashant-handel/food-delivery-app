import React, { createContext, useContext, useReducer } from "react";

const CartStateContext = createContext();
const CartDispathContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          price: action.price,
          quantity: action.quantity,
          size: action.size,
          img: action.img,
        },
      ];
    case "REMOVE":
      let newArr = [...state];
      newArr.splice(action.index, 1);
      return newArr;

    case "UPDATE":
      let arr = [...state];
      arr.find((food, index) => {
        if (food.id === action.id) {
          console.log(
            food.quantity,
            parseInt(action.quantity),
            action.price + food.price
          );
          arr[index] = {
            ...food,
            quantity: parseInt(action.quantity) + food.quantity,
            price: action.price + food.price,
          };
        }
      });
      return arr;

    default:
      console.log("Error in Reducer");
  }
};

export const CartProvider = ({ children }) => {
  // [state,dispatch = useReducer(reduer,initialState);
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <CartDispathContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispathContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispathContext);
