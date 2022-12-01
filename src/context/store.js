//COntext for storing the cart item
//acting as centeral store for cart operations
import { createContext, useReducer } from "react";

const TeeRexContext = createContext();

const TeeRexProvider = ({ children }) => {
  const initialValue = {};
  const cartReducer = (state, action) => {
    const currentState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
      case "add": {
        currentState[action.data.id] = { ...action.data, count: action.count };
        return currentState;
      }
      case "delete": {
        delete currentState[action.data.id];
        return currentState;
      }
      default:
        return initialValue;
    }
  };
  const [cart, dispatch] = useReducer(cartReducer, initialValue);
  return (
    <TeeRexContext.Provider value={{ cart, dispatch }}>
      {children}
    </TeeRexContext.Provider>
  );
};

export { TeeRexProvider, TeeRexContext };
