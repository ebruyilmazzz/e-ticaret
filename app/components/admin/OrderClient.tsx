"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/libs/firebase";
import { DataGrid } from "@mui/x-data-grid";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

type Order = {
  id: string;
  userEmail: string;
  totalAmount: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: any;
  products: any[];
};

const OrderClient = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersRef = collection(db, "orders");
        const q = query(ordersRef, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        
        const ordersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Order[];
        
        setOrders(ordersData);
      } catch (error) {
        console.error("Siparişler yüklenirken hata oluştu:", error);
        setError("Siparişler yüklenirken bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const columns = [
    { field: "id", headerName: "Sipariş ID", width: 220 },
    { field: "userEmail", headerName: "Müşteri Email", width: 200 },
    {
      field: "totalAmount",
      headerName: "Toplam Tutar",
      width: 130,
      renderCell: (params: any) => `₺${params.value}`
    },
    {
      field: "status",
      headerName: "Durum",
      width: 130,
      renderCell: (params: any) => (
        <div className={`
          px-4 py-2 rounded-full text-sm
          ${params.value === "pending" ? "bg-yellow-200 text-yellow-800" : ""}
          ${params.value === "completed" ? "bg-green-200 text-green-800" : ""}
          ${params.value === "cancelled" ? "bg-red-200 text-red-800" : ""}
        `}>
          {params.value === "pending" && "Beklemede"}
          {params.value === "completed" && "Tamamlandı"}
          {params.value === "cancelled" && "İptal Edildi"}
        </div>
      )
    },
    {
      field: "createdAt",
      headerName: "Sipariş Tarihi",
      width: 180,
      renderCell: (params: any) => {
        const date = params.value?.toDate?.();
        return date ? format(date, "dd MMMM yyyy HH:mm", { locale: tr }) : "-";
      }
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-4 text-red-500 bg-red-100 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full h-[600px] bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Siparişler</h2>
      <DataGrid
        rows={orders}
        columns={columns}
        pageSizeOptions={[10, 25, 50]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default OrderClient;