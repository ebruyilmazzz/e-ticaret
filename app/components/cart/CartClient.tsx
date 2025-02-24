"use client";

import { useEffect, useState } from "react";
import { db } from "@/libs/firebase";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore"; // Eksik içe aktarmalar burada
import PageContainer from "../containers/PageContainer";
import Image from "next/image";
import Button from "../general/Button";
import Counter from "../general/Counter";

interface CartProduct {
  id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
  description?: string;
  inStock?: boolean;
}

const CartClient = () => {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [loading, setLoading] = useState(true);

  // fetchCart fonksiyonu burada tanımlanıyor
  const fetchCart = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "cart"));
      const cartItems = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as CartProduct[];
      console.log(cartItems);
      setCartProducts(cartItems);
    } catch (error) {
      console.error("Sepet verileri alınırken hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect içinde fetchCart çağırılıyor
  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (cartItem: CartProduct, newQuantity: number) => {
    if (newQuantity < 1) return;
    const itemRef = doc(db, "cart", cartItem.id); // `doc` fonksiyonu burada kullanılıyor
    await updateDoc(itemRef, { quantity: newQuantity }); // `updateDoc` fonksiyonu burada kullanılıyor
    setCartProducts((prev) =>
      prev.map((item) =>
        item.id === cartItem.id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeProduct = async (cartItem: CartProduct) => {
    await deleteDoc(doc(db, "cart", cartItem.id)); // `deleteDoc` fonksiyonu burada kullanılıyor
    setCartProducts((prev) => prev.filter((item) => item.id !== cartItem.id));
  };

  const clearCart = async () => {
    const cartRef = collection(db, "cart");
    const querySnapshot = await getDocs(cartRef);
    querySnapshot.forEach(async (docSnap) => {
      await deleteDoc(doc(db, "cart", docSnap.id)); // `deleteDoc` fonksiyonu burada kullanılıyor
    });
    setCartProducts([]);
  };

  if (loading) return <div>Sepet yükleniyor...</div>;
  if (cartProducts.length === 0) return <div>Sepetinizde ürün bulunmamaktadır.</div>;

  const totalCartPrice = cartProducts.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  return (
    <div className="my-3 md:my-10">
      <PageContainer>
        <div className="flex items-center gap-3 text-center border-b py-3">
          <div className="w-1/5">Ürün Resmi</div>
          <div className="w-1/5">Ürün Adı</div>
          <div className="w-1/5">Ürün Miktarı</div>
          <div className="w-1/5">Ürün Fiyatı</div>
          <div className="w-1/5"></div>
        </div>
        <div>
          {cartProducts.map((cart) => (
            <div className="flex items-center justify-between text-center my-5" key={cart.id}>
              <div className="w-1/5 flex items-center justify-center">
                <Image src={cart.image} width={40} height={40} alt={cart.name} />
              </div>
              <div className="w-1/5">{cart.name}</div>
              <div className="w-1/5 flex justify-center">
                <Counter
                  cardProduct={{
                    ...cart,
                    description: cart.description || "Açıklama mevcut değil",
                    inStock: cart.inStock ?? true,
                  }}
                  increaseFunc={() => updateQuantity(cart, cart.quantity + 1)}
                  decreaseFunc={() => updateQuantity(cart, cart.quantity - 1)}
                />
              </div>
              <div className="w-1/5 text-orange-600 text-lg">{cart.price} ₺</div>
              <div className="w-1/5">
                <Button text="Ürünü Sil" small onClick={() => removeProduct(cart)} />
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between my-5 py-5 border-t">
          <button onClick={clearCart} className="w-1/5 underline text-sm">
            Sepeti Sil
          </button>
          <div className="text-lg md:text-2xl text-orange-600 font-bold">{totalCartPrice} ₺</div>
        </div>
      </PageContainer>
    </div>
  );
};

export default CartClient;
