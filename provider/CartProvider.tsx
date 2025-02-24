import { CartContextProvider } from "@/hooks/useCard"

const CartProvider = ({children}:{children:React.ReactNode}) => {
  return (
    <CartContextProvider>{children}</CartContextProvider>
  )
}

export default CartProvider