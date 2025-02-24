import { getFirestore, collection, getDocs } from "firebase/firestore";
import firebaseApp from "@/libs/firebase"; // Firebase bağlantı dosyanı burada tanımladığından emin ol

const db = getFirestore(firebaseApp);

export const fetchFirebaseProducts = async () => {
    const productsCollection = collection(db, "products"); // Koleksiyon adını Firebase'dekine göre ayarla
    const productSnapshot = await getDocs(productsCollection);
    const products = productSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
    return products;
};
