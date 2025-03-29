import { createContext } from "react";

export const filterContext = createContext({
    price: {
        to:"",
        from: ""
    },
    isOutOfStockCheck: false
})