//custom hook to use context for ease of use
import { useContext } from "react";
import { TeeRexContext } from "../context/store";

const useCart = () => {
  return useContext(TeeRexContext);
};

export default useCart;
