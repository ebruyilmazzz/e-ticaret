import { getCurrentUser } from "@/app/actions/getCurrentUser";
import getProducts from "@/app/actions/getProducts"; // Düzeltilmiş içe aktarma
import WarningText from "@/app/components/WarningText";
import ManageClient from "@/app/components/admin/ManageClient";
import AuthContainer from "@/app/components/containers/AuthContainer";

const Manage = async () => {
    const products = await getProducts({ category: null }); // Verileri al
    const currentUser = await getCurrentUser(); // Mevcut kullanıcıyı al

    if (!currentUser || currentUser.role !== "ADMIN") {
        return (
            <WarningText text="Buraya Girişin Yasaklı !!!" />
        );
    }

    return (
        <div className="w-full m-2">
            <ManageClient products={products} /> {/* Ürünleri yönet */}
        </div>
    );
};

export default Manage;
