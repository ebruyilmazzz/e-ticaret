"use client";

import { FaComputer } from "react-icons/fa6";
import { GiBallerinaShoes } from "react-icons/gi";
import { FaTabletAlt } from "react-icons/fa";
import { CiMicrophoneOn } from "react-icons/ci";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Heading from "../general/Headaing";
import Input from "../general/Input";
import Checkbox from "../general/Checkbox";
import ChoiceInput from "../general/ChoiceInput";
import Button from "../general/Button";
import { useState } from "react";
import { storage } from "@/libs/firebase";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const CreateForm = () => {
   const [img, setImg] = useState<File | null>(null);
   const [loading, setLoading] = useState(false);
   const router = useRouter();

   const categoryList = [
      {
         name: "Bilgisayar",
         icon: FaComputer
      },
      {
         name: "Ayakkabı",
         icon: GiBallerinaShoes
      },
      {
         name: "Tablet",
         icon: FaTabletAlt
      },
      {
         name: "Mikrofon",
         icon: CiMicrophoneOn
      }
   ];

   const {
      register,
      handleSubmit,
      setValue,
      watch,
      reset,
      formState: { errors },
   } = useForm<FieldValues>({
      defaultValues: {
         name: "",
         description: "",
         brand: "",
         category: "",
         price: "",
         image: "",
         inStock: false
      }
   });

   const onSubmit: SubmitHandler<FieldValues> = async (data) => {
      try {
         if (loading) return;
   
         if (!img) {
            toast.error('Lütfen bir resim seçin');
            return;
         }
   
         setLoading(true);
   
         // Benzersiz dosya adı oluştur
         const fileName = `${Date.now()}-${img.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
         const storageRef = ref(storage, `images/${fileName}`);
   
         // Upload metadata
         const metadata = {
            contentType: img.type
         };
   
         const uploadTask = uploadBytesResumable(storageRef, img, metadata);
   
         await new Promise<string>((resolve, reject) => {
            uploadTask.on(
               'state_changed',
               (snapshot) => {
                  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log('Upload progress: ' + progress + '%');
               },
               (error) => {
                  console.error('Upload error:', error);
                  toast.error('Resim yükleme hatası');
                  setLoading(false);
                  reject(error);
               },
               async () => {
                  try {
                     const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                     resolve(downloadURL);
                     // Ürün bilgileriyle birlikte resmin gerçek URL'sini gönder
                     const productData = {
                        ...data,
                        price: parseFloat(data.price),
                        image: downloadURL  // Firebase URL'yi kullan
                     };
   
                     const response = await axios.post('/api/product', productData);
   
                     if (response.data) {
                        toast.success('Ürün başarıyla eklendi!');
                        reset(); // Formu sıfırlayın
                        setImg(null); // Resim sıfırlama
                        router.push('/admin/manage');
                     }
                  } catch (error) {
                     console.error('Download URL error:', error);
                     toast.error('Resim URL alınamadı');
                     setLoading(false);
                     reject(error);
                  }
               }
            );
         });
      } catch (error: any) {
         console.error('Error:', error);
         toast.error(error.response?.data?.error || 'Ürün eklenirken bir hata oluştu');
      } finally {
         setLoading(false);
      }
   };
   

   const category = watch('category');

   const setCustomValue = (id: string, value: any) => {
      setValue(id, value, {
         shouldDirty: true,
         shouldTouch: true,
         shouldValidate: true
      });
   };

   const onChangeFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
         const file = e.target.files[0];
         // Dosya boyutu kontrolü (5MB)
         if (file.size > 5 * 1024 * 1024) {
            toast.error('Dosya boyutu 5MB\'dan küçük olmalıdır');
            return;
         }
         // Dosya tipi kontrolü
         if (!file.type.startsWith('image/')) {
            toast.error('Lütfen sadece resim dosyası seçin');
            return;
         }
         setImg(file);
      }
   };

   return (
      <div className="w-full max-w-[1150px] mx-auto">
         <Heading text="ÜRÜN OLUŞTUR" center />
         <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Input
               placeholder="Ürün Adı"
               type="text"
               id="name"
               register={register}
               errors={errors}
               required
            />
            <Input
               placeholder="Açıklama"
               type="text"
               id="description"
               register={register}
               errors={errors}
               required
            />
            <Input
               placeholder="Marka"
               type="text"
               id="brand"
               register={register}
               errors={errors}
               required
            />
            <Input
               placeholder="Fiyat"
               type="number"
               id="price"
               register={register}
               errors={errors}
               required
            />
            <Checkbox
               id="inStock"
               label="Ürün Stokta Mevcut mu?"
               register={register}
            />
            <div className="flex flex-wrap gap-3">
               {categoryList.map((cat, i) => (
                  <ChoiceInput
                     key={i}
                     icon={cat.icon}
                     text={cat.name}
                     onClick={(category) => setCustomValue("category", category)}
                     selected={category === cat.name}
                  />
               ))}
            </div>
            <input 
               className="mb-2 p-2 border rounded"
               type="file"
               accept="image/*"
               onChange={onChangeFunc}
            />
            <Button 
               text={loading ? "Ürün Ekleniyor..." : "Ürün Oluştur"}
               onClick={handleSubmit(onSubmit)}
               disabled={loading}
            />
         </form>
      </div>
   );
};

export default CreateForm;