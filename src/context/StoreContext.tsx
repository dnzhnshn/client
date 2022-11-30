import { createContext, useContext, PropsWithChildren, useState } from "react";
import { Basket } from "../app/model/basket";


interface StoreContextValue {
    basket: Basket | null,
    setBasket: (basket: Basket) => void,
    removeFromBasket: (productId: number, quantity: number) => void
}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export const useStoreContext = () => {
    const context = useContext(StoreContext);
    if (context === undefined) {
        throw Error("opp there is a error store context is undefined");
    }
    return context;
}

export const StoreProvider = ({ children }: PropsWithChildren) => {
    const [basket, setBasket] = useState<Basket | null>(null);


    function removeFromBasket(productId: number, quantity: number) {
        debugger;
        if (basket) {
            const items = [...basket.items];
            const removedItemIndex = items.findIndex(i => i.productId === productId);
            if (removedItemIndex >= 0) {
                items[removedItemIndex].quantity -= quantity;
                if (items[removedItemIndex].quantity === 0) {
                    items.splice(removedItemIndex, 1);
                }
                setBasket(prevState=>{ 
                    return {...prevState!,items}
                })
                // basket.items = items;
                // setBasket(basket);
            }
            return;
        }
        return;
    }

    return (
        <StoreContext.Provider value={{ basket, setBasket, removeFromBasket }}>
            {children}
        </StoreContext.Provider>
    )
}