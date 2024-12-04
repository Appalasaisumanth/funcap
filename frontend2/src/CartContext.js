import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(Array(16).fill(0));
    

 
    const updateProducts = (newProducts) => {
        setProducts(newProducts);
    };

    const updatePrice = (newPrices) => {
        setPrice(newPrices);
    };
    const updatequantity=(newquantity)=>{
        setQuantity(newquantity);
    }
    return (
        <CartContext.Provider value={{ products, price,quantity, updateProducts, updatePrice,updatequantity }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
