"use client";

import Image from "next/image";
import { RxAvatar } from "react-icons/rx";
import { Rating } from "@mui/material";

const Comment = ({
  prd,
}: {
  prd: { user?: { name?: string; image?: string }; rating: number; comment?: string };
}) => {
  return (
    <div className="border w-full md:w-1/3 p-4 rounded-lg my-3 bg-white shadow-md">
      <div className="flex items-center gap-2">
        {/* Kullanıcı avatarı varsa göster, yoksa varsayılan ikon kullan */}
        {prd?.user?.image ? (
          <Image
            src={prd.user.image}
            alt={prd.user.name ?? "Kullanıcı Avatarı"}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <RxAvatar size="40" className="text-gray-500" />
        )}

        <div>
          <div className="font-semibold">{prd?.user?.name || "Anonim Kullanıcı"}</div>
          <Rating name="read-only" value={prd.rating} precision={0.5} readOnly />
        </div>
      </div>

      <div className="text-gray-600 mt-2">{prd.comment ?? "Yorum bulunmamaktadır."}</div>
    </div>
  );
};

export default Comment;
