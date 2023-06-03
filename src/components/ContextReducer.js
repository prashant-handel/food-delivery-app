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
                    img: action.img
                },
            ];

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
