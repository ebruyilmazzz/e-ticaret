"use client";
import { CardProductProps } from "@/app/components/detail/DetailClient";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface CartContextProps {
  productCartQty: number;
  cartPrdcts: CardProductProps[] | null;
  addToBasket: (product: CardProductProps) => void;
  addToBasketIncrease: (product: CardProductProps) => void;
  addToBasketDecrease: (product: CardProductProps) => void;
  removeFromCart: (product: CardProductProps) => void;
  removeCart: () => void;
}

const CartContext = createContext<CartContextProps | null>(null);

interface Props {
  [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
  const [productCartQty, setProductCartQty] = useState(0);
  const [cartPrdcts, setCartPrdcts] = useState<CardProductProps[] | null>(null);

  // Initialize cart from localStorage
  useEffect(() => {
    try {
      const cartData = localStorage.getItem("cart");
      if (cartData) {
        const parsedCart = JSON.parse(cartData);
        setCartPrdcts(parsedCart);
        setProductCartQty(parsedCart.length);
      }
    } catch (error) {
      console.error("Error loading cart data:", error);
      localStorage.removeItem("cart");
      setCartPrdcts(null);
      setProductCartQty(0);
    }
  }, []);

  useEffect(() => {
    if (cartPrdcts) {
      toast.success("Sepet Güncellendi...");
    }
  }, [cartPrdcts]);
  

  const addToBasketIncrease = useCallback((product: CardProductProps) => {
    if (product.quantity >= 10) {
      return toast.error("Daha fazla ekleyemezsin...");
    }

    setCartPrdcts((prevCart) => {
      if (!prevCart) return null;

      const updatedCart = prevCart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }, []);

  const addToBasketDecrease = useCallback((product: CardProductProps) => {
    if (product.quantity <= 1) {
      return toast.error("Daha az ekleyemezsin...");
    }

    setCartPrdcts((prevCart) => {
      if (!prevCart) return null;

      const updatedCart = prevCart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
      );

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }, []);

  const removeCart = useCallback(() => {
    setCartPrdcts(null);
    setProductCartQty(0);
    toast.success("Sepet Temizlendi...");
    localStorage.removeItem("cart");
  }, []);

  const addToBasket = useCallback((product: CardProductProps) => {
    setCartPrdcts((prev) => {
      // Sepette zaten var mı diye kontrol et
      if (prev?.some(item => item.id === product.id)) {
        toast.error("Bu ürün zaten sepetinizde var!");
        return prev;
      }
  
      const updatedCart = prev ? [...prev, product] : [product];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      toast.success("Ürün Sepete Eklendi...");
      return updatedCart;
    });
  }, []);

  const removeFromCart = useCallback((product: CardProductProps) => {
    setCartPrdcts((prevCart) => {
      if (!prevCart) return null;

      const filteredProducts = prevCart.filter((item) => item.id !== product.id);
      
      if (filteredProducts.length === 0) {
        localStorage.removeItem("cart");
        toast.success("Son ürün sepetten çıkarıldı...");
        return null;
      } else {
        localStorage.setItem("cart", JSON.stringify(filteredProducts));
        toast.success("Ürün Sepetten Silindi...");
        return filteredProducts;
      }
    });
  }, []);

  const value = {
    productCartQty,
    cartPrdcts,
    addToBasket,
    addToBasketIncrease,
    addToBasketDecrease,
    removeFromCart,
    removeCart,
  };

  return <CartContext.Provider value={value} {...props} />;
};

const UseCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartContextProvider");
  }
  return context;
};

export default UseCart;
